class CsvWebPage
{
    getCsvDownloadableLink()
    {   
        // location to CSV file: color_srgb.csv
        return cy.get('#post-2363 > section > table:nth-child(6) > tbody > tr:nth-child(1) > td:nth-child(1) > a')
    }
}
export default CsvWebPage;