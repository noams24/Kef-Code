'use client'

import Link from 'next/link'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropDownMenu'
import { UserAvatar } from '@/components/UserAvatar'

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'image' | 'email'>
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className='h-8 w-8'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent  className='bg-body dark:bg-darkmode-body text dark:text-darkmode-dark' align='start'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user.name && <p className='font-medium'>{user.name}</p>}
            {user.email && (
              <p className='w-[170px] truncate text-sm text-muted-foreground'>
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {/* @ts-ignore */}
          <Link href={`user/${user.username}`}>פרופיל</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/settings'>הגדרות</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className='cursor-pointer'
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              // callbackUrl: `${window.location.origin}/sign-in`,
            })
          }}>
          יציאה
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}