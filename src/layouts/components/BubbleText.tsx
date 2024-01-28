// import styles from "@/styles/bubble.module.css"

const BubbleText = () => {
    return (
        <div className="pb-5 pl-10">
      <h2 className="text-center text-5xl">
        {"כיף קוד".split("").map((child, idx) => (
          <span className='hoverText' key={idx}>
            {child}
          </span>
        ))}
      </h2>
      </div>
    );
  };

  export default BubbleText;