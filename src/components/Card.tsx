export default function Card(
  props : {
    attributes: {
      assets: {
        gameAbsolutePath: string }[];
        name: string;
      }
    }
  ) {

  const attrs = props.attributes;
  const cardName = attrs.name;
  const imgSrc = attrs.assets[0].gameAbsolutePath

  if (imgSrc) {
    return (
      <div className="max-w-[350px] p-3">
        <img
          src={imgSrc}
          alt={`Image of the ${cardName} card.`}
        />
      </div>
    )
  }
}