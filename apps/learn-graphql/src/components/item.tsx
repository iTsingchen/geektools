type Props = {
  text: string;
  completed: boolean;
  toggleItem: () => void;
  deleteItem: () => void;
};

export function Item(props: Props) {
  const { text, completed, toggleItem, deleteItem } = props;
  return (
    <li>
      <input type="checkbox" checked={completed} onChange={toggleItem} />
      <span>{text}</span>
      <button type="button" onClick={deleteItem}>
        ×
      </button>
    </li>
  );
}
