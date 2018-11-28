import React from 'react';

export function JsonDisplay(props){

    var flattenJson = convertToFlatObject(props.json);
    return(
        <table>
            <tbody>
            {Object.keys(flattenJson).map((key) =>{
                return(
                    <tr key={key}>
                        <td>{key}</td>
                        <td>
                            {flattenJson[key]}
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}

function convertToFlatObject(object){
    //this function flattens my api response
    var toReturn = {}
    for (var item in object){
        //skip if object has no value for the item
        if (!object.hasOwnProperty(item)) continue;
        if (typeof object[item] == 'object'){
            //recursiv call if value of the current item is a object
            var flatObject = convertToFlatObject(object[item]);
            for (var o_item in flatObject){
                if (!flatObject.hasOwnProperty(o_item)) continue;
                toReturn[item + '.' + o_item] = flatObject[o_item];
            }
        }
        else{
            toReturn[item] = object[item];
        }
    }
    return toReturn;
}