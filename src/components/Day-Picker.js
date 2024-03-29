import { useState } from "react";
import { format } from "date-fns";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/styles.css";

export default function Example() {
	const [selected, setSelected] = useState<Date>();
	
	let footer = <p> Please pick a day </p>;
	if (selected){
		footer = <p> You picked {format(selected, PP)} </p>;
	}
	
	return <DayPicker
			mode="single"
			selected={selected}
			onSelect={setSelected}
			footer={footer}
		/>
	);
}