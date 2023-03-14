import { Resource } from '@/types/Resource'
import { readFile } from 'node:fs/promises'
import path from 'path'

const jsonDirectory = path.join(process.cwd(), 'src/data')
const FILE_PATH = `${jsonDirectory}/resources.json`

export const getResources = async (): Promise<Resource[]> => {
  try {
    const resourcesJson: string = await readFile(FILE_PATH, 'utf8')
    const resources: Resource[] = JSON.parse(resourcesJson)
    return resources
  } catch (error: any) {
    console.error(`Error reading resources: ${error.message}`)
    throw error
  }
}

export const getResourceTypes = async (): Promise<string[]> => {
  const resources: Resource[] = await getResources()
  const types: string[] = Array.from(
    new Set(resources.map((resource: Resource) => resource.type)),
  )
  return types
}
