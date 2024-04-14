export type TeamApiObj = { 
  id: number; 
  name: string; full_name: string; abbreviation: string;
  city: string; conference: string; division: string; 
}

export class TeamModel {
  id: number;
  name: string;
  fullName: string;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
 
  constructor (id: number, name: string, fullName: string, abbreviation: string, city: string, conference: string, division: string) {    
    this.id = id;
    this.name = name;
    this.fullName = fullName;
    this.abbreviation = abbreviation;
    this.city = city;
    this.conference = conference;
    this.division = division;
  }

  static getApiRepresentation(team: TeamModel): TeamApiObj { 
    return {
      id: team.id,
      name: team.name,
      full_name: team.fullName,
      abbreviation: team.abbreviation,
      city: team.city,
      conference: team.conference,
      division: team.division
    }
  }
}
