import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {
baseUrl='http://127.0.0.1:8200/api'
// baseUrl='http://192.168.1.23:8200/api'
constructor(private http: HttpClient) { }

// Function for standards
createStandards(standards:Object):Observable<any>{
  return this.http.post(`${this.baseUrl}/create-standards/`,standards)
}
addDocumentForStandards(standards:Object,indexModelAndSerilazers:Object):Observable<any>{
  return this.http.post(`${this.baseUrl}/event_standards/`,standards,indexModelAndSerilazers)
}
getAllData(generyStandarads:Object):Observable<any>{
  return this.http.get(`${this.baseUrl}/event_standards/${generyStandarads}`)
}
updateRow(referenceAndIndex:any,newData:object):Observable<any>{
  return this.http.put(`${this.baseUrl}/update-row-genery/${referenceAndIndex}`,newData)
}
getSpcificStandartsTable(data:Object):Observable<any>{
  return this.http.get(`${this.baseUrl}/get-specific-standrarts-data/${data}`)
}
// get-all-names-documents
getAllNamesDocument():Observable<any>{
  return this.http.get(`${this.baseUrl}/get-all-names-documents/`)
}
getSpcificRow(data:Object):Observable<any>{
  return this.http.get(`${this.baseUrl}/get-specific-row/${data}`)
}
getFile(url: string){
  return this.http.get(`${this.baseUrl}${url}`, { responseType: 'blob' });
}
// download-all-file-documents
getAllFilesDocuemnts(date:any):Observable<Blob>{
  return this.http.get(`${this.baseUrl}/download-all-file-documents/${date}`,{ responseType: 'blob' ,observe: 'body',});
}
downLoadFile(url:string){
this.http.get(url,{
  responseType:'blob'
})
.subscribe((r)=>{
  saveAs(r,'filename.zip')
})
}

// function disinfectants //
// re_path(r"^get-new-reference",views.get_new_reference),
// re_path(r'^create-new-row/$',views.OfficialEventFrom.as_view()) 
createNewRow(data:any):Observable<any>{
  return this.http.post(`${this.baseUrl}/create-new-row/`,data)
}
getAllDisinfectants():Observable<any>{
  return this.http.get(`${this.baseUrl}/get-all-disinfectants`)
}
getNewReference():Observable<any>{
  return this.http.get(`${this.baseUrl}/get-new-reference`)
}
updateRowDisinfectants(data:any):Observable<any>{
  return this.http.put(`${this.baseUrl}/update-row/`,data)
}


// function orders //
saveDataOrder(data:any):Observable<any>{
  return this.http.post(`${this.baseUrl}/create-order/`,data)
}
updateOrder(data:any,date_order:any):Observable<any>{
  return this.http.put(`${this.baseUrl}/update_order/`,data)
}
getAllOrder():Observable<any>{
  return this.http.get(`${this.baseUrl}/get_all_order`)
}
getSpecificeOrder(reference:any):Observable<any>{
  return this.http.get(`${this.baseUrl}/get_specific_order/${reference}`)
}

////////////////////////////////////////
// wholesaler funcrtion

insertWholesaler(data:any):Observable<any>{
  return this.http.post(`${this.baseUrl}/insert-wholesaler/`,data)
}
getWholesalerToOrder(referenceOrder:any):Observable<any>{
  return this.http.get(`${this.baseUrl}/get-wholesaler-to-order/${referenceOrder}`)
}


// function forms
createForm(data:any):Observable<any>{
  return this.http.post(`${this.baseUrl}/create-form/`,data)
}
updateForm(reference:any,data:any):Observable<any>{
  return this.http.put(`${this.baseUrl}/update-form/`,data)
}
getSpecificForm(reference:any):Observable<any>{
  return this.http.get(`${this.baseUrl}/get-specific-form/${reference}`)
}
getAllFormControl():Observable<any>{
  return this.http.get(`${this.baseUrl}/get-all-form-control`)
}
getISHelfForm():Observable<any>{
  return this.http.get(`${this.baseUrl}/get-is-helf-form`)
}

////// quality function ////////////////////
createQualityForm(data:any):Observable<any>{
  return this.http.post(`${this.baseUrl}/create-quality-form/`,data)
}
updateQualityForm(data:any):Observable<any>{
  return this.http.put(`${this.baseUrl}/update-quality-form/`,data)
}
getSpecificQualityForm(reference_test:any):Observable<any>{
  return this.http.get(`${this.baseUrl}/get-specific-quality-form/${reference_test}`)
}
getAllQualityForm():Observable<any>{
  return this.http.get(`${this.baseUrl}/get-all-quality-form`)
}
getNewReferenceTest():Observable<any>{
  return this.http.get(`${this.baseUrl}/get-new`)
}
// 
}


