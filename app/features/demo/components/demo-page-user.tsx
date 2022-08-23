import { DemoProject, DemoUser } from '@prisma/client'

interface DemoPageUserProps {
  item: DemoUser & { projects: DemoProject[] }
}

/**
 * Just display a user, nothing more here
 */
export default function DemoPageUser({ item }: DemoPageUserProps) {
  return (
    <div className="px-1">
      {item.email ? (
        <a
          className="text-blue-800 underline-offset-2 hover:underline"
          href={'mailto:' + item.email}
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
            {project.date ? (
              <span className="ml-2 text-gray-500">
                - {project.date.toLocaleDateString()}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
