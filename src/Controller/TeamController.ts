import { TeamModel, TeamApiObj } from "../Model/NbaModel";
const api_url: string = 'https://09e71717-cda8-44cd-a93d-d09d152a6d8a-00-ton99vf723o.worf.replit.dev';

export class TeamController {

  // GET -> List
  static async get(url_path:string = '/teams', team_search:string=''):Promise<TeamModel[]> {
    let teamList: TeamModel[] = []; 
    let url: string = `${api_url}${url_path}?_sort=full_name`
    if(team_search)
      url = `${api_url}/teams?_sort=full_name&full_name_like=${team_search}`
    try {
      const response = await fetch(url, 
        { method: "GET", 
          cache: "no-cache"
        }
      );
      const data = await response.json();
      if(!data.erro){
        data.forEach((item: TeamApiObj) => {
          const teamObj:TeamModel = new TeamModel(item.id, 
            item.name, item.full_name, item.abbreviation, 
            item.city, item.conference, item.division)
          teamList.push(teamObj);
        });
      } else {
        console.log("Error response in getting teams: ", data.erro);
      }
    } catch (error) {
      console.log("Unknown Error while getting teams: ", error);
    }
    return teamList;
  }

  // GET By ID
  static async getById(url_path:string = '/teams', id:number):Promise<TeamModel> {
    //let team: TeamModel = {} as TeamModel; 
    let team: TeamModel = {} as TeamModel; 
    let url: string = `${api_url}${url_path}/${id}/`
    try {
      const response = await fetch(url);
      const data = await response.json();
      if(!data.erro){
          team = new TeamModel(data.id, 
            data.name, data.full_name, data.abbreviation, 
            data.city, data.conference, data.division)
      } else {
        console.log("Error response in getting team by id: ", data.erro);
      }
    } catch (error) {
      console.log("Unknown Error while getting tem by id: ", error);
    }
    return team;
  }

  // CREATE
  static async post(url_path:string = '/teams', RqData:TeamModel):Promise<TeamModel> {
    let url: string = `${api_url}${url_path}`
    let resp: any = null;
    // Convert Local Model to API Model representation
    const request: TeamApiObj = TeamModel.getApiRepresentation(RqData);
    try {
      const response = await fetch(url, 
        { method: "POST", 
          body: JSON.stringify(request),
          headers: { "Content-Type": "application/json" }
        }
      );
      const rsData = await response.json();
      if(!rsData.erro){
          const teamObj:TeamModel = new TeamModel(rsData.id, 
            rsData.name, rsData.full_name, rsData.abbreviation, 
            rsData.city, rsData.conference,  rsData.division)
          resp = teamObj;
      } else {
        console.log("Error response in getting teams: ", rsData.erro);
      }
    } catch (error) {
      console.log("Unknown Error while getting teams: ", error);
    }
    return resp;
  }

// CHANGE
  static async put(url_path:string = '/teams', RqData:TeamModel):Promise<TeamModel> {
    let url: string = `${api_url}${url_path}/${RqData.id}/`
    let resp: any = null;
    // Convert Local Model to API Model representation
    const request: TeamApiObj = TeamModel.getApiRepresentation(RqData);
    try {
      const response = await fetch(url, 
        { method: "PUT", 
          body: JSON.stringify(request),
          headers: { "Content-Type": "application/json" }
        }
      );
      const rsData = await response.json();
      if(!rsData.erro){
          const teamObj:TeamModel = new TeamModel(rsData.id, 
            rsData.name, rsData.full_name, rsData.abbreviation, 
            rsData.city, rsData.conference,  rsData.division)
          resp = teamObj;
      } else {
        console.log("Error response in getting teams: ", rsData.erro);
      }
    } catch (error) {
      console.log("Unknown Error while getting teams: ", error);
    }
    return resp;
  }

  // DELETE
  static async delete(url_path:string = '/teams', id:number):Promise<boolean> {
    let url: string = `${api_url}${url_path}/${id}/`
    let resp: boolean = false;
    try {
      const response = await fetch(url, 
        { method: "DELETE" }
      );
      const rsData = await response.json();
      if(!rsData.erro){
          resp = true;
      } else {
        console.log("Error response in getting teams: ", rsData.erro);
      }
    } catch (error) {
      console.log("Unknown Error while getting teams: ", error);
    }
    return resp;
  }
}