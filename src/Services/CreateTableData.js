import React from 'react';
import Dataset from '../assets/Manufac_Dataset.json'

// create component for calculate data
const createTableData = () => {
    // variable to store calculated values
    const acc = [];
    const average = [];
    // loop on crops data
    Dataset.map((curr, i) => {
        // extract year from string
        let matches = curr['Year'].match(/(\d+)/);
        // check year is already exist in acc variable
        let index = acc.findIndex( x => x.year === matches[0]);
        // year not exits
        if(index === -1){
            // push new row for table
            acc.push({year: matches[0], max: parseInt(curr['Crop Production (UOM:t(Tonnes))']) ?? 0, max_corp_name: curr['Crop Name'], min_corp_name: curr['Crop Name'], min: curr['Crop Production (UOM:t(Tonnes))'] ?? 0})
        } else if(acc[index]){
            // check for maximum production for crops
            if(acc[index]['year'] && acc[index]['year'] === matches[0] && acc[index]['max'] < curr['Crop Production (UOM:t(Tonnes))']){
                acc[index]['max'] = curr['Crop Production (UOM:t(Tonnes))']
                acc[index]['max_corp_name'] = curr['Crop Name']
            }
            // check for minimum production for crops
            if(acc[index]['year'] && acc[index]['year'] === matches[0] && acc[index]['min'] > curr['Crop Production (UOM:t(Tonnes))']){
                acc[index]['min'] = curr['Crop Production (UOM:t(Tonnes))']
                acc[index]['min_corp_name'] = curr['Crop Name']
            }
        }

        // CALCULATING AVERAGE OF Yield AND Cultivation
        //check crops is already exist in acc variable
        let index_aver = average.findIndex( x => x.crop_name === curr['Crop Name']);
        if(index_aver === -1){
            // push new row for table
            average.push({crop_name: curr['Crop Name'], Yield:0, Cultivation: 0, year: matches[0]} )
        } else if(average[index_aver]){
            average[index_aver]['Yield'] = curr['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] ?? average[index_aver]['Yield']+curr['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']
            average[index_aver]['Cultivation'] = curr['Area Under Cultivation (UOM:Ha(Hectares))'] ?? average[index_aver]['Cultivation'] + curr['Area Under Cultivation (UOM:Ha(Hectares))']
        }
    })


    average.map((val, i) => {
        // FOR DECIMAL TO 3
        average[i]['Yield'] = parseFloat(average[i]['Yield'] / Dataset.length).toFixed(3)
        average[i]['Cultivation'] = parseFloat(average[i]['Cultivation'] / Dataset.length).toFixed(3)
    })
    return {crops_data: acc, average: average}
}

export default createTableData