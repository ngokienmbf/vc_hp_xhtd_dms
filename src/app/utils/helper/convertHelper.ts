import { Injectable } from "@angular/core";
import { lstStep } from "./constant";

@Injectable({
  providedIn: 'root'
})

export class convertHelper {
  showStep(value: number) {
    const index = lstStep.findIndex(a => a.value === value);
    return lstStep[index]?.name;
  }

}

