export default function Contributor({
  img,
  github,
  name,
  linkedin,
}: {
  img: string;
  github: string;
  name: string;
  linkedin: string;
}) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-[250px] gap-2">
        <img src={img} className="h-[100px] w-[100px] rounded" />

        <div className="flex flex-col justify-between">
          <h2 className="font-bold">{name}</h2>
          <a href={github} className="flex">
            <img src="images/github.png" />
            <p className="mx-auto">GitHub</p>
          </a>
          <a href={linkedin} className="flex">
            <img src="images/linkedin.png" />
            <p className="m-auto">LinkedIn</p>
          </a>
        </div>
      </div>
    </div>
  );
}
