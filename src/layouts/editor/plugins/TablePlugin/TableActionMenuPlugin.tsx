/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ElementNode, LexicalEditor } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import useLexicalEditable from '@lexical/react/useLexicalEditable';
import {
  $deleteTableColumn__EXPERIMENTAL,
  $deleteTableRow__EXPERIMENTAL,
  $getNodeTriplet,
  $getTableCellNodeFromLexicalNode,
  $getTableColumnIndexFromTableCellNode,
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableRowIndexFromTableCellNode,
  $insertTableColumn__EXPERIMENTAL,
  $insertTableRow__EXPERIMENTAL,
  $isTableCellNode,
  $isTableRowNode,
  $isTableSelection,
  $patchCellStyle,
  $unmergeCell,
  getTableObserverFromTableElement,
  HTMLTableElementWithWithTableSelectionState,
  TableCellHeaderStates,
  TableCellNode,
  TableRowNode,
  TableSelection,
} from '../../nodes/TableNode';
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isElementNode,
  $isParagraphNode,
  $isRangeSelection,
  $isTextNode,
} from 'lexical';
import * as React from 'react';
import { ReactPortal, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import invariant from '../../shared/invariant';

import ColorPicker from '../ToolbarPlugin/Tools/ColorPicker';
import { getStyleObjectFromCSS } from '../../nodes/utils';
import { MenuItem, ListItemText, Menu, Divider, Box, IconButton } from '@mui/material';
import { DragIndicator } from '@mui/icons-material';

function computeSelectionCount(selection: TableSelection): {
  columns: number;
  rows: number;
} {
  const selectionShape = selection.getShape();
  return {
    columns: selectionShape.toX - selectionShape.fromX + 1,
    rows: selectionShape.toY - selectionShape.fromY + 1,
  };
}

// This is important when merging cells as there is no good way to re-merge weird shapes (a result
// of selecting merged cells and non-merged)
function isTableSelectionRectangular(selection: TableSelection): boolean {
  const nodes = selection.getNodes();
  const currentRows: Array<number> = [];
  let currentRow = null;
  let expectedColumns = null;
  let currentColumns = 0;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if ($isTableCellNode(node)) {
      const row = node.getParentOrThrow();
      invariant(
        $isTableRowNode(row),
        'Expected CellNode to have a RowNode parent',
      );
      if (currentRow !== row) {
        if (expectedColumns !== null && currentColumns !== expectedColumns) {
          return false;
        }
        if (currentRow !== null) {
          expectedColumns = currentColumns;
        }
        currentRow = row;
        currentColumns = 0;
      }
      const colSpan = node.__colSpan;
      for (let j = 0; j < colSpan; j++) {
        if (currentRows[currentColumns + j] === undefined) {
          currentRows[currentColumns + j] = 0;
        }
        currentRows[currentColumns + j] += node.__rowSpan;
      }
      currentColumns += colSpan;
    }
  }
  return (
    (expectedColumns === null || currentColumns === expectedColumns) &&
    currentRows.every((v) => v === currentRows[0])
  );
}

function $canUnmerge(): boolean {
  const selection = $getSelection();
  if (
    ($isRangeSelection(selection) && !selection.isCollapsed()) ||
    ($isTableSelection(selection) && !selection.anchor.is(selection.focus)) ||
    (!$isRangeSelection(selection) && !$isTableSelection(selection))
  ) {
    return false;
  }
  const [cell] = $getNodeTriplet(selection.anchor);
  return cell.__colSpan > 1 || cell.__rowSpan > 1;
}

function $cellContainsEmptyParagraph(cell: TableCellNode): boolean {
  if (cell.getChildrenSize() !== 1) {
    return false;
  }
  const firstChild = cell.getFirstChildOrThrow();
  if (!$isParagraphNode(firstChild) || !firstChild.isEmpty()) {
    return false;
  }
  return true;
}

function $selectLastDescendant(node: ElementNode): void {
  const lastDescendant = node.getLastDescendant();
  if ($isTextNode(lastDescendant)) {
    lastDescendant.select();
  } else if ($isElementNode(lastDescendant)) {
    lastDescendant.selectEnd();
  } else if (lastDescendant !== null) {
    lastDescendant.selectNext();
  }
}

function currentCellStyle(
  editor: LexicalEditor,
): Record<string, string> | null {
  return editor.getEditorState().read(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      const [cell] = $getNodeTriplet(selection.anchor);
      if ($isTableCellNode(cell)) {
        const css = cell.getStyle();
        if (!css) return null;
        const style = getStyleObjectFromCSS(css);
        return style;
      }
    }
    return null;
  });
}

type TableCellActionMenuProps = Readonly<{
  anchorElRef: { current: null | HTMLElement };
  onClose: () => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  tableCellNode: TableCellNode;
}>;

function TableActionMenu({
  onClose,
  tableCellNode: _tableCellNode,
  setIsMenuOpen,
  anchorElRef,
}: TableCellActionMenuProps) {
  const [editor] = useLexicalComposerContext();
  const [tableCellNode, updateTableCellNode] = useState(_tableCellNode);
  const [selectionCounts, updateSelectionCounts] = useState({
    columns: 1,
    rows: 1,
  });
  const [canMergeCells, setCanMergeCells] = useState(false);
  const [canUnmergeCell, setCanUnmergeCell] = useState(false);
  const [style, setStyle] = useState(() => currentCellStyle(editor));

  useEffect(() => {
    return editor.registerMutationListener(TableCellNode, (nodeMutations) => {
      const nodeUpdated =
        nodeMutations.get(tableCellNode.getKey()) === 'updated';

      if (nodeUpdated) {
        editor.getEditorState().read(() => {
          updateTableCellNode(tableCellNode.getLatest());
        });
        setStyle(currentCellStyle(editor));
      }
    });
  }, [editor, tableCellNode]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      // Merge cells
      if ($isTableSelection(selection)) {
        const currentSelectionCounts = computeSelectionCount(selection);
        updateSelectionCounts(computeSelectionCount(selection));
        setCanMergeCells(
          isTableSelectionRectangular(selection) &&
          (currentSelectionCounts.columns > 1 ||
            currentSelectionCounts.rows > 1),
        );
      }
      // Unmerge cell
      setCanUnmergeCell($canUnmerge());
    });
  }, [editor]);

  const handleClose = useCallback(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  const clearTableSelection = useCallback(() => {
    editor.update(() => {
      if (tableCellNode.isAttached()) {
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
        const tableElement = editor.getElementByKey(
          tableNode.getKey(),
        ) as HTMLTableElementWithWithTableSelectionState;

        if (!tableElement) {
          throw new Error('Expected to find tableElement in DOM');
        }

        const tableSelection = getTableObserverFromTableElement(tableElement);
        if (tableSelection !== null) {
          tableSelection.clearHighlight();
        }

        tableNode.markDirty();
        updateTableCellNode(tableCellNode.getLatest());
      }

      const rootNode = $getRoot();
      rootNode.selectStart();
    });
  }, [editor, tableCellNode]);

  const mergeTableCellsAtSelection = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isTableSelection(selection)) {
        const { columns, rows } = computeSelectionCount(selection);
        const nodes = selection.getNodes();
        let firstCell: null | TableCellNode = null;
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if ($isTableCellNode(node)) {
            if (firstCell === null) {
              node.setColSpan(columns).setRowSpan(rows);
              firstCell = node;
              const isEmpty = $cellContainsEmptyParagraph(node);
              let firstChild;
              if (
                isEmpty &&
                $isParagraphNode((firstChild = node.getFirstChild()))
              ) {
                firstChild.remove();
              }
            } else if ($isTableCellNode(firstCell)) {
              const isEmpty = $cellContainsEmptyParagraph(node);
              if (!isEmpty) {
                firstCell.append(...node.getChildren());
              }
              node.remove();
            }
          }
        }
        if (firstCell !== null) {
          if (firstCell.getChildrenSize() === 0) {
            firstCell.append($createParagraphNode());
          }
          $selectLastDescendant(firstCell);
        }
        onClose();
      }
    });
  };

  const unmergeTableCellsAtSelection = () => {
    editor.update(() => {
      $unmergeCell();
    });
  };

  const insertTableRowAtSelection = useCallback(
    (shouldInsertAfter: boolean) => {
      editor.update(() => {
        $insertTableRow__EXPERIMENTAL(shouldInsertAfter);
        onClose();
      });
    },
    [editor, onClose],
  );

  const insertTableColumnAtSelection = useCallback(
    (shouldInsertAfter: boolean) => {
      editor.update(() => {
        for (let i = 0; i < selectionCounts.columns; i++) {
          $insertTableColumn__EXPERIMENTAL(shouldInsertAfter);
        }
        onClose();
      });
    },
    [editor, onClose, selectionCounts.columns],
  );

  const deleteTableRowAtSelection = useCallback(() => {
    editor.update(() => {
      $deleteTableRow__EXPERIMENTAL();
      onClose();
    });
  }, [editor, onClose]);

  const deleteTableAtSelection = useCallback(() => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
      tableNode.remove();

      clearTableSelection();
      onClose();
    });
  }, [editor, tableCellNode, clearTableSelection, onClose]);

  const deleteTableColumnAtSelection = useCallback(() => {
    editor.update(() => {
      $deleteTableColumn__EXPERIMENTAL();
      onClose();
    });
  }, [editor, onClose]);

  const toggleTableRowIsHeader = useCallback(() => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);

      const tableRowIndex = $getTableRowIndexFromTableCellNode(tableCellNode);

      const tableRows = tableNode.getChildren();

      if (tableRowIndex >= tableRows.length || tableRowIndex < 0) {
        throw new Error('Expected table cell to be inside of table row.');
      }

      const tableRow = tableRows[tableRowIndex];

      if (!$isTableRowNode(tableRow)) {
        throw new Error('Expected table row');
      }

      tableRow.getChildren().forEach((tableCell) => {
        if (!$isTableCellNode(tableCell)) {
          throw new Error('Expected table cell');
        }

        tableCell.toggleHeaderStyle(TableCellHeaderStates.ROW);
      });

      clearTableSelection();
      onClose();
    });
  }, [editor, tableCellNode, clearTableSelection, onClose]);

  const toggleTableColumnIsHeader = useCallback(() => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);

      const tableColumnIndex =
        $getTableColumnIndexFromTableCellNode(tableCellNode);

      const tableRows = tableNode.getChildren<TableRowNode>();
      const maxRowsLength = Math.max(
        ...tableRows.map((row) => row.getChildren().length),
      );

      if (tableColumnIndex >= maxRowsLength || tableColumnIndex < 0) {
        throw new Error('Expected table cell to be inside of table row.');
      }

      for (let r = 0; r < tableRows.length; r++) {
        const tableRow = tableRows[r];

        if (!$isTableRowNode(tableRow)) {
          throw new Error('Expected table row');
        }

        const tableCells = tableRow.getChildren();
        if (tableColumnIndex >= tableCells.length) {
          // if cell is outside of bounds for the current row (for example various merge cell cases) we shouldn't highlight it
          continue;
        }

        const tableCell = tableCells[tableColumnIndex];

        if (!$isTableCellNode(tableCell)) {
          throw new Error('Expected table cell');
        }

        tableCell.toggleHeaderStyle(TableCellHeaderStates.COLUMN);
      }

      clearTableSelection();
      onClose();
    });
  }, [editor, tableCellNode, clearTableSelection, onClose]);

  const handleCellColor = useCallback(
    (key: string, value: string) => {
      const styleKey = key === 'text' ? 'color' : 'background-color';
      applyCellStyle({ [styleKey]: value });
    },
    [editor],
  );

  const applyCellStyle = useCallback(
    (styles: Record<string, string>) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection) || $isTableSelection(selection)) {
          const [cell] = $getNodeTriplet(selection.anchor);
          if ($isTableCellNode(cell)) {
            $patchCellStyle([cell], styles);
          }

          if ($isTableSelection(selection)) {
            const nodes = selection.getNodes();
            const cells = nodes.filter($isTableCellNode);
            $patchCellStyle(cells, styles);
          }
        }
      });
    },
    [editor],
  );

  let mergeCellButton: null | JSX.Element = null;
  if (canMergeCells) {
    mergeCellButton = (
      <MenuItem onClick={() => mergeTableCellsAtSelection()}>
        <ListItemText>
          Merge cells
        </ListItemText>
      </MenuItem>
    );
  } else if (canUnmergeCell) {
    mergeCellButton = (
      <MenuItem onClick={() => unmergeTableCellsAtSelection()}>
        <ListItemText>
          Unmerge cells
        </ListItemText>
      </MenuItem>
    );
  }

  let writingModeButton: null | JSX.Element = null;
  if (style?.['writing-mode'] === 'vertical-rl') {
    writingModeButton = (
      <MenuItem onClick={() => applyCellStyle({ 'writing-mode': 'horizontal-tb' })}>
        <ListItemText>
          הפוך לאופקי
        </ListItemText>
      </MenuItem>
    );
  } else {
    writingModeButton = (
      <MenuItem onClick={() => applyCellStyle({ 'writing-mode': 'vertical-rl' })}>
        <ListItemText>
          הפוך לאנכי
        </ListItemText>
      </MenuItem>
    );
  }


  return (
    <Menu
    dir='rtl'
      anchorEl={anchorElRef.current}
      open={true}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      sx={{ displayPrint: 'none' }}
    >
      {mergeCellButton}
      {writingModeButton}
      <ColorPicker
        onColorChange={handleCellColor}
        toggle="menuitem"
      />
      <Divider />
      <MenuItem onClick={() => insertTableRowAtSelection(false)}>
        <ListItemText>
          הוסף{' '}
          {selectionCounts.rows === 1 ? 'שורה' : `${selectionCounts.rows} שורות`}{' '}
          מעל
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={() => insertTableRowAtSelection(true)}>
        <ListItemText>
          הוסף{' '}
          {selectionCounts.rows === 1 ? 'שורה' : `${selectionCounts.rows} שורות`}{' '}
          מתחת
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={() => insertTableColumnAtSelection(false)}>
        <ListItemText>
          הוסף{' '}
          {selectionCounts.columns === 1 ? 'עמודה' : `${selectionCounts.columns} עמודות`}{' '}
          לשמאל
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={() => insertTableColumnAtSelection(true)}>
        <ListItemText>
          הוסף{' '}
          {selectionCounts.columns === 1 ? 'עמודה' : `${selectionCounts.columns} עמודות`}{' '}
          לימין
        </ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => deleteTableColumnAtSelection()}>
        <ListItemText>מחק עמודה</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => deleteTableRowAtSelection()}>
        <ListItemText>מחק שורה</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => deleteTableAtSelection()}>
        <ListItemText>מחק טבלה</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => toggleTableRowIsHeader()}>
        <ListItemText>
          {(tableCellNode.__headerState & TableCellHeaderStates.ROW) ===
            TableCellHeaderStates.ROW
            ? 'מחק'
            : 'הוסף'}{' '}
          כותרת לשורה
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={() => toggleTableColumnIsHeader()}>
        <ListItemText>
          {(tableCellNode.__headerState & TableCellHeaderStates.COLUMN) ===
            TableCellHeaderStates.COLUMN
            ? 'מחק'
            : 'הוסף'}{' '}
          כותרת לעמודה
        </ListItemText>
      </MenuItem>
    </Menu >
  );
}

function TableCellActionMenuContainer({
  anchorElem,
}: {
  anchorElem: HTMLElement;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();

  const menuButtonRef = useRef(null);
  const menuRootRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [tableCellNode, setTableMenuCellNode] = useState<TableCellNode | null>(
    null,
  );

  const moveMenu = useCallback(() => {
    const menu = menuButtonRef.current;
    const selection = $getSelection();
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (selection == null || menu == null) {
      setTableMenuCellNode(null);
      return;
    }

    const rootElement = editor.getRootElement();

    if (
      $isRangeSelection(selection) &&
      rootElement !== null &&
      nativeSelection !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const tableCellNodeFromSelection = $getTableCellNodeFromLexicalNode(
        selection.anchor.getNode(),
      );

      if (tableCellNodeFromSelection == null || !$isTableCellNode(tableCellNodeFromSelection)) {
        setTableMenuCellNode(null);
        return;
      }

      const tableCellParentNodeDOM = editor.getElementByKey(
        tableCellNodeFromSelection.getKey(),
      );

      if (tableCellParentNodeDOM == null) {
        setTableMenuCellNode(null);
        return;
      }

      setTableMenuCellNode(tableCellNodeFromSelection);
    } else if (!activeElement) {
      setTableMenuCellNode(null);
    }
  }, [editor]);

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        moveMenu();
      });
    });
  });

  useEffect(() => {
    const menuButtonDOM = menuButtonRef.current as HTMLButtonElement | null;

    if (menuButtonDOM != null && tableCellNode != null) {
      const tableCellNodeDOM = editor.getElementByKey(tableCellNode.getKey());

      if (tableCellNodeDOM != null) {
        const tableCellRect = tableCellNodeDOM.getBoundingClientRect();
        const menuRect = menuButtonDOM.getBoundingClientRect();
        const anchorRect = anchorElem.getBoundingClientRect();

        menuButtonDOM.style.opacity = '1';
        menuButtonDOM.style.left = `${tableCellRect.left + menuRect.width - 28 - anchorRect.left}px`;

        menuButtonDOM.style.top = `${tableCellRect.top - anchorRect.top + 4}px`;
      } else {
        menuButtonDOM.style.opacity = '0';
      }
    }
  }, [menuButtonRef, tableCellNode, editor, anchorElem]);

  const prevTableCellDOM = useRef(tableCellNode);

  useEffect(() => {
    if (prevTableCellDOM.current !== tableCellNode) {
      setIsMenuOpen(false);
    }

    prevTableCellDOM.current = tableCellNode;
  }, [prevTableCellDOM, tableCellNode]);

  return (
    <Box sx={{ position: 'absolute', displayPrint: 'none', zIndex: 1 }} ref={menuButtonRef}>
      {tableCellNode != null && (
        <>
          <IconButton size="small" ref={menuRootRef}
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}>
            <DragIndicator fontSize='inherit' />
          </IconButton>
          {isMenuOpen && (
            <TableActionMenu
              anchorElRef={menuRootRef}
              setIsMenuOpen={setIsMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              tableCellNode={tableCellNode}
            />
          )}
        </>
      )}
    </Box>
  );
}

export default function TableActionMenuPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement;
}): null | ReactPortal {
  const isEditable = useLexicalEditable();
  return createPortal(
    isEditable ? (
      <TableCellActionMenuContainer
        anchorElem={anchorElem}
      />
    ) : null,
    anchorElem,
  );
}