import { Star } from "lucide-react";
import "./RatingFilter.css";

interface Props {
  value?: number;
  onChange: (rating: number | undefined) => void;
}

const OPTIONS = [4, 3, 2, 1];

const RatingFilter = ({ value, onChange }: Props) => {
  return (
    <div className="sidebar-block rating-filter">
      <h3>Reyting bo'yicha</h3>
      <ul>
        {OPTIONS.map((stars) => (
          <li
            key={stars}
            className={value === stars ? "active" : ""}
            onClick={() => onChange(value === stars ? undefined : stars)}
          >
            <span className="rating-filter-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill={i < stars ? "#f59e0b" : "none"} color="#f59e0b" />
              ))}
            </span>
            <span className="rating-filter-label">va yuqori</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatingFilter;
