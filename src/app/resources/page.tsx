import { Resource } from '@/types/Resource'
import Image from 'next/image'
import Link from 'next/link'
import { getResources, getResourceTypes } from '../../services/resourceService'

const Resources = async () => {
  const resources: Resource[] = await getResources()
  const resourceTypes: string[] = await getResourceTypes()
  return (
    <div className="grid grid-cols-1 gap-10">
      {resourceTypes.map((resourceType: string) => {
        return (
          <div key={resourceType} className="flex flex-col gap-4">
            <h2 className="text-2xl capitalize">{resourceType}</h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {resources
                .filter((resource: Resource) => resource.type === resourceType)
                .map((resource: Resource, index: number) => (
                  <Link
                    href={resource.url}
                    target="_blank"
                    key={index}
                    className="relative flex items-center gap-2 overflow-hidden rounded-xl bg-white p-6 shadow ring-1 ring-slate-200 hover:bg-sky-50 hover:ring-sky-400 dark:bg-slate-800 dark:text-slate-50 dark:ring-slate-700 dark:hover:ring-sky-400"
                  >
                    <Image
                      src={resource.icon}
                      width={36}
                      height={36}
                      alt={resource.name}
                      className="rounded-full"
                    />
                    <div className="flex flex-col gap-1.5">
                      <div>{resource.name}</div>
                      <div className="text-xs text-slate-500">
                        {resource.description}
                      </div>
                    </div>
                    <div className="absolute right-0 top-0 rounded-bl-xl bg-gradient-to-r from-slate-600 to-slate-500 px-2 text-xs font-thin uppercase text-white dark:bg-slate-800 dark:ring-1 dark:ring-slate-400/10">
                      {resource.lang}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Resources
