import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import focaccia from "../../assets/focaccia.jpg";
import funghi from "../../assets/funghi.jpg";
import margherita from "../../assets/margherita.jpg";
import prosciutto from "../../assets/prosciutto.jpg";
import salamino from "../../assets/salamino.jpg";
import spinaci from "../../assets/spinaci.jpg";

const fallbackImages = [
  focaccia,
  funghi,
  margherita,
  prosciutto,
  salamino,
  spinaci,
];

function getRotatingFallback(index) {
  return fallbackImages[index % fallbackImages.length];
}

function MenuItem({ pizza, index }) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="flex gap-4 py-6">
      <img
        src={imageUrl}
        alt={name}
        onError={(e) => {
          e.target.onerror = null; // prevent infinite loop
          e.target.src = getRotatingFallback(index); // swap to fallback
        }}
        className={`h-36 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          <Button type="small" disabled={soldOut}>
            Add to cart
          </Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
