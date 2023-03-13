import { useState } from 'react'
import { saveAs } from 'file-saver'
import * as xlsx from 'xlsx'

const useExcelExport = () => {
  const [exporting, setExporting] = useState(false)

  const handleExport = async (data: any[], filename: string) => {
    setExporting(true)
    const flattenedData = data.map((item) => {
      const itemsString = item.items
        .map(
          (subItem: any) =>
            `${subItem.title}:${subItem.requiredItems
              .map((requiredItem: any) => {
                if (requiredItem.element) {
                  const elementItem = requiredItem.items
                    .map((ele: any) => `${ele.name} x ${ele.requiredAmount}`)
                    .join(',')
                  return `${requiredItem.element}-${elementItem}`
                } else {
                  return `${requiredItem.name} x ${requiredItem.requiredAmount}`
                }
              })
              .join(',')}`,
        )
        .join(';')
      return Object.assign(item, { items: itemsString })
    })

    try {
      // Convert data to xlsx format
      const workbook = xlsx.utils.book_new()
      const worksheet = xlsx.utils.json_to_sheet(flattenedData)
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      const excelBuffer = xlsx.write(workbook, { type: 'buffer' })
      // Save the file to client
      const blob = new Blob([excelBuffer], { type: 'application/vnd.ms-excel' })
      saveAs(blob, filename)
    } catch (error) {
      console.error(error)
    } finally {
      setExporting(false)
    }
  }

  return {
    exporting,
    handleExport,
  }
}

export default useExcelExport
