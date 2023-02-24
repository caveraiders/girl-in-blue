import { Resource } from '@/types/Resource'
import { readFile } from 'node:fs/promises'

export const getResources = async (): Promise<Resource[]> => {
  try {
    const resourcesJson: string = await readFile(
      './src/data/resources.json',
      'utf8',
    )
    const resources: Resource[] = JSON.parse(resourcesJson)
    return resources
  } catch (err: any) {
    console.error(`Error reading resources: ${err.message}`)
    return []
  }
}

export const getResourceTypes = async (): Promise<string[]> => {
  const resources: Resource[] = await getResources()
  const types: string[] = Array.from(
    new Set(resources.map((resource: Resource) => resource.type)),
  )
  return types
}
