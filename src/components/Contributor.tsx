export default function Contributor(props) {
  return (
    <div className="flex p-4">
      <img src={props.img} className="w-20 h-20 rounded" />
      <div className="flex-col px-2 ">
        <h2 className="font-bold">{props.name}</h2>
        <a href={props.github} className="flex">
            <img src="../contributors/images/github.png" />
            <p className="mx-auto">GitHub</p>
         </a>
          <a href={props.linkedin} className="flex">
            <img src="../contributors/images/linkedin.png" />
            <p className="m-auto">LinkedIn</p>
         </a>
      </div>
    </div>
  );
}
