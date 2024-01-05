import React, {useState, useEffect, useContext} from 'react';


export default function ItemSelector ({values}) {
	
	
	if (values.projectlabors != null){
		
		return  (
			<select className="form-control form-control-sm mt-2" id="FormControlSelectCategory" >			
				{values.projectlabors?.map(labor => (
					<option 
						key={labor.id}
						value={labor.id}
						onClick={(e) => values.setSelectedLabor(labor)}>
						{labor.type}
					</option>
				))}
			</select>		
	),
	else{
		
		return (
			<select className="form-control form-control-sm mt-2" id="FormControlSelectCategory" disable>			
				<option Select some project </option>
				))}
			</select>		
		)
	}
	
	
}