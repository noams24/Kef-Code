import "../../styles/pi.scss";

interface Props {
  completed: string;
}

function Pi({ completed }: Props) {
  return (
    <svg viewBox="0 0 36 36" className="circular-chart green">
      <path
        className="circle-bg"
        d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        className="circle"
        strokeDasharray={`${completed}, 100`}
        d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" className="percentage">
        {completed}%
      </text>
    </svg>
  );
}

export default Pi;
