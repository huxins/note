# Syncfusion Excel Framework

[Essential XlsIO](https://help.syncfusion.com/document-processing/excel/excel-library/net/overview) 是一个本地 .NET 类库，可用于使用 C#、VB.NET 和托管 C++ 代码创建和修改 Microsoft Excel 文件。

## 一、使用 Excel 数据

### 从工作表导入数据

[从工作表中导入](https://help.syncfusion.com/document-processing/excel/excel-library/net/import-export/export-from-excel#excel-to-collection-objects)原始数据后，可以按需求对数据进行处理。

```c#
public void Import(string filePath)
{
    using (ExcelEngine excelEngine = new ExcelEngine())
    {
        IApplication application = excelEngine.Excel;
        application.DefaultVersion = ExcelVersion.Excel2016;

        // 加载 Excel 文件
        FileStream fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
        IWorkbook workbook = application.Workbooks.Open(fileStream);
        IWorksheet worksheet = workbook.Worksheets[0];

        // 遍历工作表中的行
        for (int row = 14; row <= worksheet.UsedRange.LastRow; row++)
        {
            DateTime date = worksheet[row, 1].DateTime;
            string description = worksheet[row, 2].Text;
            decimal amount = decimal.Parse(worksheet[row, 3].Text);
        }

        // Close the workbook and stream
        workbook.Close();
        fileStream.Close();
    }
}
```
