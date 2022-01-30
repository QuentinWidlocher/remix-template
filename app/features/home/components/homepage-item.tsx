import { DemoProject, DemoUser } from "@prisma/client";

interface HomePageProps {
  item: DemoUser & { projects: DemoProject[] };
}

export default function HomePageItem({ item }: HomePageProps) {
  return (
    <div className="px-1">
      {item.email ? (
        <a
          className="text-blue-800 underline-offset-2 hover:underline"
          href={"mailto:" + item.email}
        >
          {item.name} ({item.email})
        </a>
      ) : (
        <span>{item.name}</span>
      )}
      - {item.projects.length} projects
      <ul>
        {item.projects.map((project) => (
          <li key={project.id}>
            <span>{project.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
