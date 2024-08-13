import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

export default Templates = async (cvId) => {
  const db = await SQLite.openDatabaseAsync(`cv${cvId}.db`);
  const personalDetails = await db.getAllAsync("SELECT * FROM personalDetails");
  const workHistory = await db.getAllAsync(
    "SELECT * FROM workHistory ORDER BY startDate DESC"
  );
  const education = await db.getAllAsync(
    "SELECT * FROM education ORDER BY startDate DESC"
  );
  const skills = await db.getAllAsync("SELECT * FROM skills");
  const objective = await db.getAllAsync("SELECT * FROM objectives");
  const references = await db.getAllAsync("SELECT * FROM references_");
  const languges = await db.getAllAsync("SELECT * FROM languages_");
  const interests = await db.getAllAsync("SELECT * FROM interests");
  const achievements = await db.getAllAsync("SELECT * FROM achievements");

  let profilePhoto = "";

  if (personalDetails[0].profilePhoto) {
    profilePhoto = await FileSystem.readAsStringAsync(
      personalDetails[0].profilePhoto,
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );
  }

  const template_6 = `
    <!DOCTYPE html>
    <head>
        <style>
            
           @page {
                margin-left: 40px;
                margin-right: 40px;
                margin-top: 30px;
                margin-bottom: 40px;
            }
            
            .text {
                font-size: 14pt;
                font-family: Arial;
            }

            .hr {
                background-color: black;
                height: 1pt;
                margin-top: 0pt;
            }
            .subHeading {
                font-size: 15pt;
                font-family: Arial;
            }

            #skills {
                margin-left: 15pt;
                padding-left: 0;
                line-height: 1;
            }
            .avoid-page-break {
                page-break-inside: avoid;
            }
        </style>
    </head>
    <html>        
        <body style=">
             
            ${
              personalDetails
                ? `
                        <div style="line-height: 1.2;">
                            <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
                                <div>
                                    ${
                                      personalDetails[0].fullName
                                        ? `<h1 style="font-size: 40pt; font-family: Arial; font-weight: 800;">
                                                ${personalDetails[0].fullName}
                                                
                                            </h1>`
                                        : ""
                                    }
                                    ${
                                      personalDetails[0].profession
                                        ? `<h2 style="font-size: 15pt; font-family: Arial; font-weight: 800; margin-top: -30pt;">
                                                ${personalDetails[0].profession.toUpperCase()}
                                            </h2>`
                                        : ""
                                    }
                                </div>
                                ${
                                  personalDetails[0].profilePhoto
                                    ? `
                                            <img src="data:image/png;base64,${profilePhoto}" height="120px" width="120px" style="border-radius: 100%;"/>
                                        `
                                    : ""
                                }
                            </div>
                            <div style="margin-top: -10pt; line-height: 1.2;">
                                ${
                                  personalDetails[0].email
                                    ? `<div style="display: flex; flex-direction: row; align-items: center; flex-start;">
                                            <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                <p class="text" style="font-weight: 800;">E-mail</p>
                                                <p style="margin-right: 20px;">:</p>
                                            </div>
                                            <p class="text">${personalDetails[0].email}</p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].phone
                                    ? `<div style="display: flex; flex-direction: row; align-items: center; flex-start; margin-top: -20pt;">
                                            <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                <p class="text" style="font-weight: 800;">Cellphone</p>
                                                <p style="margin-right: 20px;">:</p>
                                            </div>
                                            <p class="text">${personalDetails[0].phone}</p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].address_
                                    ? `<div style="display: flex; flex-direction: row; align-items: center; flex-start; margin-top: -20pt;">
                                            <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                <p class="text" style="font-weight: 800;">Address</p>
                                                <p style="margin-right: 20px;">:</p>
                                            </div>
                                            <p class="text">${personalDetails[0].address_}</p>
                                        </div>`
                                    : ""
                                } 
                                ${
                                  personalDetails[0].nationality
                                    ? `<div style="display: flex; flex-direction: row; align-items: center; flex-start; margin-top: -20pt;">
                                            <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                <p class="text" style="font-weight: 800;">Nationality</p>
                                                <p style="margin-right: 20px;">:</p>
                                            </div>
                                            <p class="text">${personalDetails[0].nationality}</p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].gender
                                    ? `<div style="display: flex; flex-direction: row; align-items: center; flex-start; margin-top: -20pt;">
                                            <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                <p class="text" style="font-weight: 800;">Sex</p>
                                                <p style="margin-right: 20px;">:</p>
                                            </div>
                                            <p class="text">${personalDetails[0].gender}</p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].dateOfBirth
                                    ? `<div style="display: flex; flex-direction: row; align-items: center; flex-start; margin-top: -20pt;">
                                            <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                <p class="text" style="font-weight: 800;">Date of Birth</p>
                                                <p style="margin-right: 20px;" class="text">:</p>
                                            </div>
                                            <p class="text">${personalDetails[0].dateOfBirth}</p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].maritalStatus
                                    ? `<div style="display: flex; flex-direction: row; align-items: center; flex-start; margin-top: -20pt;">
                                            <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                <p class="text" style="font-weight: 800;">Maritual Status</p>
                                                <p style="margin-right: 20px;" class="text">:</p>
                                            </div>
                                            <p class="text">${personalDetails[0].maritalStatus}</p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].religion
                                    ? `<div style="display: flex; flex-direction: row; align-items: center; flex-start; margin-top: -20pt;">
                                            <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                <p class="text" style="font-weight: 800;">Religion</p>
                                                <p style="margin-right: 20px;" class="text">:</p>
                                            </div>
                                            <p class="text">${personalDetails[0].religion}</p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].githubAccount
                                    ? `<div style="display: flex; flex-direction: row; align-items: center; flex-start; margin-top: -20pt;">
                                            <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                <p class="text" style="font-weight: 800;">GitHub</p>
                                                <p style="margin-right: 20px;" class="text">:</p>
                                            </div>
                                            <p class="text">${personalDetails[0].githubAccount}</p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].linkedIn
                                    ? `<div style="display: flex; flex-direction: row; align-items: center; flex-start; margin-top: -20pt;">
                                            <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                <p class="text" style="font-weight: 800;">LinkedIn</p>
                                                <p style="margin-right: 20px;" class="text">:</p>
                                            </div>
                                            <p class="text">${personalDetails[0].linkedIn}</p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].website
                                    ? `<div style="display: flex; flex-direction: row; align-items: center; flex-start; margin-top: -20pt;">
                                            <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                <p class="text" style="font-weight: 800;">Website</p>
                                                <p style="margin-right: 20px;" class="text">:</p>
                                            </div>
                                            <p class="text">${personalDetails[0].website}</p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].portfolio
                                    ? `<div style="display: flex; flex-direction: row; align-items: center; flex-start; margin-top: -20pt;">
                                            <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                <p class="text" style="font-weight: 800;">Portfolio</p>
                                                <p style="margin-right: 20px;" class="text">:</p>
                                            </div>
                                            <p class="text">${personalDetails[0].portfolio}</p>
                                        </div>`
                                    : ""
                                }
                            </div>
                        </div>
                    `
                : ""
            }
            ${
              objective.length
                ? `<div style="margin-top: 10pt;">
                        <h2 class="subHeading">
                            <b>OBJECTIVE</b>
                            <hr class="hr">
                        </h2>
                        <p class="text" style="margin-top: -5pt; line-height: 1.2;">
                            ${objective[0].objective}
                        </p>
                    </div>`
                : ""
            }
            ${
              skills.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>SKILLS</b>
                            <hr class="hr">
                        </h2></div>
                        <ul id="skills" style="margin-top: -5pt;">
                            ${skills
                              .map(
                                (skill) =>
                                  `<div class="avoid-page-break">
                                        <li class="text" style="margin-top: 5pt;">${skill.skill}</li>
                                    </div>`
                              )
                              .join("")}
                        </ul>
                    </div>`
                : ""
            }
            ${
              education.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>EDUCATION</b>
                            <hr class="hr">
                        </h2></div>
                        ${education
                          .map(
                            (educationDetail) =>
                              `<div style="margin-top: -5pt; line-height: 1;">
                                    <div class="avoid-page-break"><p class="text">
                                        <b>${educationDetail.degree}</b>
                                    </p></div>
                                    <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                        <div class="avoid-page-break"><p class="text">${
                                          educationDetail.school
                                        }</p></div>
                                        <div class="avoid-page-break">
                                            <p class="text">(${
                                              typeof educationDetail.startDate ===
                                              "string"
                                                ? educationDetail.startDate
                                                : new Date(
                                                    educationDetail.startDate
                                                  )
                                                    .toDateString()
                                                    .slice(3)
                                            } to ${
                                typeof educationDetail.endDate === "string"
                                  ? educationDetail.endDate
                                  : new Date(educationDetail.endDate)
                                      .toDateString()
                                      .slice(3)
                              })</p>
                                        </div>
                                    </div>
                                </div>`
                          )
                          .join("")}
                    </div>`
                : ""
            }
            ${
              workHistory.length
                ? `<div style="margin-top: 0pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>WORK HISTORY</b>
                            <hr class="hr">
                        </h2></div>
                        ${workHistory
                          .map(
                            (workDetail) =>
                              `
                                <div class="avoid-page-break"><p class="text">
                                    <b>${workDetail.jobtitle.toUpperCase()}</b>
                                </p></div>
                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                    <div class="avoid-page-break">
                                        <p class="text">${
                                          workDetail.company
                                        }</p>
                                    </div>
                                    <div class="avoid-page-break">
                                        <p class="text">(${
                                          typeof workDetail.startDate ===
                                          "string"
                                            ? workDetail.startDate
                                            : new Date(workDetail.startDate)
                                                .toDateString()
                                                .slice(3)
                                        } to ${
                                typeof workDetail.endDate === "string"
                                  ? workDetail.endDate
                                  : new Date(workDetail.endDate)
                                      .toDateString()
                                      .slice(3)
                              })</p>
                                    </div>
                                </div>
                                <div style="margin-top: -15pt; line-height: 0.5; margin-bottom: 25pt;">
                                    <div class="avoid-page-break"><p><b>Description:</b></p></div>
                                        ${
                                          workDetail.description
                                            ? workDetail.description
                                                .split("\n")
                                                .map(
                                                  (detail) =>
                                                    `<div class="avoid-page-break"><p class="text">${detail}</p></div>`
                                                )
                                                .join("")
                                            : ""
                                        }
                                </div>
                                `
                          )
                          .join("")}
                    </div>`
                : ""
            }
            ${
              languges.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>LANGUAGES</b>
                            <hr class="hr">
                        </h2></div>
                        <ul id="skills" style="margin-top: -5pt;">
                            ${languges
                              .map(
                                (language) =>
                                  `<div class="avoid-page-break">
                                        <li class="text" style="margin-top: 5pt;">${language.language}</li>
                                    </div>`
                              )
                              .join("")}
                        </ul>
                    </div>`
                : ""
            }
            ${
              interests.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>HOBBYS / INTERESTS</b>
                            <hr class="hr">
                        </h2></div>
                        <ul id="skills" style="margin-top: -5pt;">
                            ${interests
                              .map(
                                (interest) =>
                                  `<div class="avoid-page-break">
                                        <li class="text" style="margin-top: 5pt;">${interest.interest}</li>
                                    </div>`
                              )
                              .join("")}
                        </ul>
                    </div>`
                : ""
            }
            ${
              achievements.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>ACHIEVEMENTS</b>
                            <hr class="hr">
                        </h2></div>
                        <ul id="skills" style="margin-top: -5pt;">
                            ${achievements
                              .map(
                                (achievement) =>
                                  `<div class="avoid-page-break">
                                        <li class="text" style="margin-top: 5pt;">${achievement.achievement}</li>
                                    `
                              )
                              .join("")}
                        </ul>
                    </div>`
                : ""
            }
            ${
              references.length
                ? `<h2 class="subHeading">
                        <b>REFERENCES</b>
                    <hr class="hr">
                    </h2>
                    ${references
                      .map(
                        (reference) =>
                          `<div>
                                ${
                                  reference.refName
                                    ? `<p class="text">${reference.refName}</p>`
                                    : ""
                                }
                                ${
                                  reference.companyName
                                    ? `<p style="margin-top: -10pt;" class="text">${reference.companyName}</p>`
                                    : ""
                                }
                                ${
                                  reference.address_
                                    ? reference.address_
                                        .split(",")
                                        .map(
                                          (line) =>
                                            `<p style="margin-top: -10pt;" class="text">${line}</p>`
                                        )
                                        .join("")
                                    : ""
                                }
                                <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                    ${
                                      reference.email
                                        ? `<p class="text">E-mail: ${reference.email}</p>`
                                        : ""
                                    }
                                    ${
                                      reference.phone
                                        ? `<p style="margin-top: -10pt;" class="text">CELL: ${reference.phone}</p>`
                                        : ""
                                    }
                                </div>
                            </div>`
                      )
                      .join("")}
                `
                : ""
            }
        </body>
    </html>

    `;

  const template_3 = `
        <!DOCTYPE html>
        <head>
            <style>
                body {
                    padding: 0;
                    margin: 0;
                }
                @page {
                    margin-top: 40px;
                    margin-bottom: 30px;
                }
                @page:first {
                    margin-top: 0px;
                }   
                .bg {
                    background-color: #FCA049;
                    font-family: Helvetica;
                }
                .text {
                    font-family: Helvetica;
                    font-size: 14pt;
                }
                
                #skills {
                    margin-left: 13pt;
                    padding-left: 0;
                    line-height: 1;
                }
            </style>
        </head>
        <html>
            <body>
                ${
                  personalDetails[0].email ||
                  personalDetails[0].phone ||
                  personalDetails[0].linkedIn
                    ? `
                            <div style="width: 100%; height: 50px;" class="bg">
                                <div style="display: flex; flex-direction: row; justify-content: space-between; width:90%; margin-left: 5%; margin-right: 5%">
                                </div>
                            </div>
                        `
                    : ""
                }
                <div style="margin-left: 5%; margin-right: 5%">
                    <div>
                        ${
                          personalDetails[0].fullName
                            ? `<h1 class="text" style="font-size: 65px; font-weight: 800;">${personalDetails[0].fullName}</h1>`
                            : ""
                        }
                        ${
                          personalDetails[0].profession
                            ? `<h2 style="font-size: 15pt; font-family: Arial; font-weight: 800; margin-top: -30pt;">
                                    ${personalDetails[0].profession.toUpperCase()}
                                </h2>`
                            : ""
                        }
                    </div>
                    ${
                      objective.length || personalDetails[0].profilePhoto
                        ? `<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: start; margin-top: -20pt;">
                                ${
                                  objective.length
                                    ? `<p class="text" style="line-height: 1.2;">${objective[0].objective}</p>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].profilePhoto
                                    ? `<img src="data:image/png;base64,${profilePhoto}" height="120px" width="120px" style="border-radius: 100%; margin-left: 10pt;" />`
                                    : ""
                                }
                            </div>`
                        : ""
                    }
                    <hr class="bg" style="height: 2pt; margin-top: 10pt;"/>
                </div>
                <div style="margin-left: 5%; margin-right: 5%">
                    <div style="column-fill: auto; column-count: 2; column-gap: 20px;">
                    ${
                      personalDetails[0].nationality ||
                      personalDetails[0].gender ||
                      personalDetails[0].dateOfBirth ||
                      personalDetails[0].maritalStatus ||
                      personalDetails[0].religion
                        ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>PERSONAL DETAILS</b></h2></div>
                                 
                            ${
                              personalDetails[0].nationality
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Nationality:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].nationality}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].gender
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Sex:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].gender}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].dateOfBirth
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Date of Birth:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].dateOfBirth}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].maritalStatus
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Maritual Status:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].maritalStatus}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].religion
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Religion:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].religion}
                                        </p>
                                    </div>`
                                : ""
                            }
                                    `
                        : ""
                    }
                        ${
                          personalDetails[0].email ||
                          personalDetails[0].phoneNumber ||
                          personalDetails[0].address_ ||
                          personalDetails[0].githubAccount ||
                          personalDetails[0].linkedIn ||
                          personalDetails[0].website ||
                          personalDetails[0].portfolio
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>CONTACT DETAILS</b></h2></div>
                                    ${
                                      personalDetails[0].email
                                        ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">E-mail:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].email}
                                            </p>
                                        </div>`
                                        : ""
                                    }
                                ${
                                  personalDetails[0].phoneNumber
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Phone Number:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].phoneNumber}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].address_
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Address:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].address_}
                                            </p>
                                        </div>`
                                    : ""
                                } 
                                
                                ${
                                  personalDetails[0].githubAccount
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">GitHub:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].githubAccount}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].linkedIn
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">LinkedIn:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].linkedIn}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].website
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Website:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].website}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].portfolio
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Portfolio:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].portfolio}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                        `
                            : ""
                        }
                        ${
                          skills.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>SKILLS</b></h2></div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      .map(
                                        (skill) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill.skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          skills.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>SKILLS</b></h2></div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      .map(
                                        (skill) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill.skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          education.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>EDUCATION</b></h2></div>
                                    ${education
                                      .map(
                                        (educationDetail) =>
                                          `<div style="margin-top: -5pt; line-height: 1;">
                                                <div class="avoid-page-break"><h3 class="text">
                                                    <b>${
                                                      educationDetail.degree
                                                    }</b>
                                                </h3></div>
                                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                                    <div class="avoid-page-break">
                                                        <p class="text">${educationDetail.school.toUpperCase()}</p>
                                                    </div>
                                                    <div class="avoid-page-break">
                                                        <p class="text">${
                                                          typeof educationDetail.endDate ===
                                                          "string"
                                                            ? educationDetail.endDate
                                                            : new Date(
                                                                educationDetail.endDate
                                                              ).getFullYear()
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>`
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          workHistory.length
                            ? `<div style="margin-top: 0pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>WORK HISTORY</b></h2></div>
                                    ${workHistory
                                      .map(
                                        (workDetail) =>
                                          `
                                            <div class="avoid-page-break">
                                                <p class="text"><b>${
                                                  workDetail.jobtitle
                                                }</b> - ${
                                            typeof workDetail.startDate ===
                                            "string"
                                              ? workDetail.startDate
                                              : new Date(workDetail.startDate)
                                                  .toDateString()
                                                  .slice(3)
                                          } to ${
                                            typeof workDetail.endDate ===
                                            "string"
                                              ? workDetail.endDate
                                              : new Date(workDetail.endDate)
                                                  .toDateString()
                                                  .slice(3)
                                          }</p>
                                            </div>
                                            <div class="avoid-page-break">
                                                <p style="margin-top: -10pt;" class="text">${workDetail.company.toUpperCase()}</p>
                                            </div>
                                                ${
                                                  workDetail.description
                                                    ? `<ul id="skills" style="margin-top: -5pt;">
                                                            ${workDetail.description
                                                              .split("\n")
                                                              .map(
                                                                (description) =>
                                                                  `<div class="avoid-page-break">
                                                                        <li class="text" style="margin-top: 5pt;">${description.slice(
                                                                          1
                                                                        )}</li>
                                                                    </div>`
                                                              )
                                                              .join("")}
                                                        </ul>`
                                                    : ""
                                                }
                                            `
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          languges.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <b>LANGUAGES</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${languges
                                          .map(
                                            (language) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${language.language}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          interests.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <b>HOBBYS / INTERESTS</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${interests
                                          .map(
                                            (interest) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${interest.interest}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          achievements.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <b>ACHIEVEMENTS</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${achievements
                                          .map(
                                            (achievement) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${achievement.achievement}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          references.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                    <b>REFERENCES</b>
                                </h2></div>
                                ${references
                                  .map(
                                    (reference) =>
                                      `<div>
                                            ${
                                              reference.refName
                                                ? `<div class="avoid-page-break"><p class="text">${
                                                    reference.refName
                                                  } ${`${
                                                    reference.jobTitle
                                                      ? ` - ${reference.jobTitle}`
                                                      : ""
                                                  }`}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference.companyName
                                                ? `<div class="avoid-page-break"><p style="margin-top: -10pt;" class="text">${reference.companyName}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference.address_
                                                ? reference.address_
                                                    .split(",")
                                                    .map(
                                                      (line) =>
                                                        `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">${line}</p></div>`
                                                    )
                                                    .join("")
                                                : ""
                                            }
                                            <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                                ${
                                                  reference.email
                                                    ? `<div class="avoid-page-break"><p class="text">E-mail: ${reference.email}</p></div>`
                                                    : ""
                                                }
                                                ${
                                                  reference.phone
                                                    ? `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">CELL: ${reference.phone}</p></div>`
                                                    : ""
                                                }
                                            </div>
                                        </div>`
                                  )
                                  .join("")}
                            `
                            : ""
                        }
                    </div>
                </div>
            </body>
        </html>
    `;

  const template_7 = `
    <!DOCTYPE html>
    <head>
        <style>
            
           @page {
                margin-left: 40px;
                margin-right: 40px;
                margin-top: 30px;
                margin-bottom: 40px;
            }
            
            .text {
                font-size: 12pt;
                font-family: Arial;
            }

            .hr {
                background-color: black;
                height: 1pt;
                margin-top: 0pt;
            }
            .subHeading {
                font-size: 15pt;
                font-family: Arial;
            }

            #skills {
                margin-left: 15pt;
                padding-left: 0;
                line-height: 1;
            }
            .avoid-page-break {
                page-break-inside: avoid;
            }
        </style>
    </head>
    <html>        
        <body style=">
             
            ${
              personalDetails
                ? `
                        <div style="line-height: 0;">
                            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                    ${
                                      personalDetails[0].profilePhoto
                                        ? `
                                                <img src="data:image/png;base64,${profilePhoto}" height="120px" width="120px" style="border-radius: 100%; align-self: center;"/>
                                            `
                                        : ""
                                    }
                                    ${
                                      personalDetails[0].fullName
                                        ? `<h1 style="font-size: 40pt; font-family: Arial; font-weight: 800; text-align: center;">
                                                ${personalDetails[0].fullName}
                                                
                                            </h1>`
                                        : ""
                                    }
                                    ${
                                      personalDetails[0].profession
                                        ? `<h2 style="font-size: 15pt; font-family: Arial; font-weight: 800; margin-top: -30pt; text-align: center;">
                                                ${personalDetails[0].profession.toUpperCase()}
                                            </h2>`
                                        : ""
                                    }
                            </div>
                            <div style="margin-top: 10pt; line-height: 0;">
                                ${
                                  personalDetails[0].email
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">E-mail:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].email}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].phoneNumber
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Phone Number:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].phoneNumber}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].address_
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Address:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].address_}
                                            </p>
                                        </div>`
                                    : ""
                                } 
                                ${
                                  personalDetails[0].nationality
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Nationality:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].nationality}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].gender
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Sex:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].gender}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].dateOfBirth
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Date of Birth:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].dateOfBirth}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].maritalStatus
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Maritual Status:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].maritalStatus}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].religion
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Religion:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].religion}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].githubAccount
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">GitHub:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].githubAccount}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].linkedIn
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">LinkedIn:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].linkedIn}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].website
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Website:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].website}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].portfolio
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Portfolio:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].portfolio}
                                            </p>
                                        </div>`
                                    : ""
                                }
                            </div>
                        </div>
                    `
                : ""
            }
            ${
              objective.length
                ? `<div style="margin-top: 10pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>OBJECTIVE</b>
                            <hr class="hr">
                        </h2></div>
                        <div class="avoid-page-break"><p class="text" style="margin-top: -5pt;">
                            ${objective[0].objective}
                        </p></div>
                    </div>`
                : ""
            }
            ${
              skills.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>SKILLS</b>
                            <hr class="hr">
                        </h2></div>
                        <ul id="skills" style="margin-top: -5pt;">
                            ${skills
                              .map(
                                (skill) =>
                                  `<div class="avoid-page-break">
                                        <li class="text" style="margin-top: 5pt;">${skill.skill}</li>
                                    </div>`
                              )
                              .join("")}
                        </ul>
                    </div>`
                : ""
            }
            ${
              education.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>EDUCATION</b>
                            <hr class="hr">
                        </h2></div>
                        ${education
                          .map(
                            (educationDetail) =>
                              `<div style="margin-top: -5pt; line-height: 1;">
                                    <div class="avoid-page-break"><p class="text">
                                        <b>${educationDetail.degree}</b>
                                    </p></div>
                                    <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                        <div class="avoid-page-break"><p class="text">${
                                          educationDetail.school
                                        }</p></div>
                                        <div class="avoid-page-break">
                                            <p class="text">(${
                                              typeof educationDetail.startDate ===
                                              "string"
                                                ? educationDetail.startDate
                                                : new Date(
                                                    educationDetail.startDate
                                                  )
                                                    .toDateString()
                                                    .slice(3)
                                            } to ${
                                typeof educationDetail.endDate === "string"
                                  ? educationDetail.endDate
                                  : new Date(educationDetail.endDate)
                                      .toDateString()
                                      .slice(3)
                              })</p>
                                        </div>
                                    </div>
                                </div>`
                          )
                          .join("")}
                    </div>`
                : ""
            }
            ${
              workHistory.length
                ? `<div style="margin-top: 0pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>WORK HISTORY</b>
                            <hr class="hr">
                        </h2></div>
                        ${workHistory
                          .map(
                            (workDetail) =>
                              `
                                <div class="avoid-page-break"><p class="text">
                                    <b>${workDetail.jobtitle}</b>
                                </p></div>
                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                    <div class="avoid-page-break">
                                        <p class="text">${
                                          workDetail.company
                                        }</p>
                                    </div>
                                    <div class="avoid-page-break">
                                        <p class="text">(${
                                          typeof workDetail.startDate ===
                                          "string"
                                            ? workDetail.startDate
                                            : new Date(workDetail.startDate)
                                                .toDateString()
                                                .slice(3)
                                        } to ${
                                typeof workDetail.endDate === "string"
                                  ? workDetail.endDate
                                  : new Date(workDetail.endDate)
                                      .toDateString()
                                      .slice(3)
                              })</p>
                                    </div>
                                </div>
                                <div style="margin-top: -10pt; line-height: 0.5; margin-bottom: 20pt;">
                                    <div class="avoid-page-break"><p><b>Description:</b></p></div>
                                        ${
                                          workDetail.description
                                            ? workDetail.description
                                                .split("\n")
                                                .map(
                                                  (detail) =>
                                                    `<div class="avoid-page-break"><p class="text">${detail}</p></div>`
                                                )
                                                .join("")
                                            : ""
                                        }
                                </div>
                                `
                          )
                          .join("")}
                    </div>`
                : ""
            }
            ${
              languges.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>LANGUAGES</b>
                            <hr class="hr">
                        </h2></div>
                        <ul id="skills" style="margin-top: -5pt;">
                            ${languges
                              .map(
                                (language) =>
                                  `<div class="avoid-page-break">
                                        <li class="text" style="margin-top: 5pt;">${language.language}</li>
                                    </div>`
                              )
                              .join("")}
                        </ul>
                    </div>`
                : ""
            }
            ${
              interests.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>HOBBYS / INTERESTS</b>
                            <hr class="hr">
                        </h2></div>
                        <ul id="skills" style="margin-top: -5pt;">
                            ${interests
                              .map(
                                (interest) =>
                                  `<div class="avoid-page-break">
                                        <li class="text" style="margin-top: 5pt;">${interest.interest}</li>
                                    </div>`
                              )
                              .join("")}
                        </ul>
                    </div>`
                : ""
            }
            ${
              achievements.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>ACHIEVEMENTS</b>
                            <hr class="hr">
                        </h2></div>
                        <ul id="skills" style="margin-top: -5pt;">
                            ${achievements
                              .map(
                                (achievement) =>
                                  `<div class="avoid-page-break">
                                        <li class="text" style="margin-top: 5pt;">${achievement.achievement}</li>
                                    `
                              )
                              .join("")}
                        </ul>
                    </div>`
                : ""
            }
            ${
              references.length
                ? `<h2 class="subHeading">
                        <b>REFERENCES</b>
                    <hr class="hr">
                    </h2>
                    ${references
                      .map(
                        (reference) =>
                          `<div>
                                ${
                                  reference.refName
                                    ? `<p>${reference.refName}</p>`
                                    : ""
                                }
                                ${
                                  reference.companyName
                                    ? `<p style="margin-top: -10pt;">${reference.companyName}</p>`
                                    : ""
                                }
                                ${
                                  reference.address_
                                    ? reference.address_
                                        .split(",")
                                        .map(
                                          (line) =>
                                            `<p style="margin-top: -10pt;">${line}</p>`
                                        )
                                        .join("")
                                    : ""
                                }
                                <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                    ${
                                      reference.email
                                        ? `<p>E-mail: ${reference.email}</p>`
                                        : ""
                                    }
                                    ${
                                      reference.phone
                                        ? `<p style="margin-top: -10pt;">CELL: ${reference.phone}</p>`
                                        : ""
                                    }
                                </div>
                            </div>`
                      )
                      .join("")}
                `
                : ""
            }
        </body>
    </html>

    `;

  const template_9 = `
        <!DOCTYPE html>
        <head>
            <style>
                body {
                    padding: 0;
                    margin: 0;
                }
                @page {
                    margin-top: 40px;
                    margin-bottom: 30px;
                }  
                .bg {
                    font-family: Helvetica;
                }
                .text {
                    font-family: Helvetica;
                    font-size: 13pt;
                }
                
                #skills {
                    margin-left: 13pt;
                    padding-left: 0;
                    line-height: 1;
                }
            </style>
        </head>
        <html>
            <body>
                <div style="margin-left: 5%; margin-right: 5%">
                ${
                  objective.length ||
                  personalDetails[0].profilePhoto ||
                  personalDetails[0].fullName ||
                  personalDetails[0].profession
                    ? `<div style="display: flex; flex-direction: row; align-items: end; justify-content: baseline; margin-bottom: 20pt;">
                                ${
                                  personalDetails[0].profilePhoto
                                    ? `<img src="data:image/png;base64,${profilePhoto}" height="400px" width="45%"/>`
                                    : ""
                                }
                                <div style="padding: 10px; background-color: rgba(0, 0, 0, 0.1); width: 100%">
                                    ${
                                      personalDetails[0].fullName
                                        ? `<h1 class="text" style="font-size: 25pt; font-weight: 800;">${personalDetails[0].fullName}</h1>`
                                        : ""
                                    }
                                    ${
                                      personalDetails[0].profession
                                        ? `<h2 style="font-size: 15pt; font-family: Arial; font-weight: 800; margin-top: -20pt;">
                                                ${personalDetails[0].profession.toUpperCase()}
                                            </h2>`
                                        : ""
                                    }
                                    ${
                                      objective.length
                                        ? `<h2 class="bg" style="padding: 5px;">
                                            <hr style="background-color: black; height: 1pt;">
                                            <b>OBJECTIVE</b>
                                        </h2>
                                        <p class="text" style="margin-top: -10pt;">${objective[0].objective}</p>`
                                        : ""
                                    }
                                </div>
                            </div>`
                    : ""
                }
                </div>
                <div style="margin-left: 5%; margin-right: 5%">
                    <div style="column-fill: auto; column-count: 2; column-gap: 20px;">
                    ${
                      personalDetails[0].nationality ||
                      personalDetails[0].gender ||
                      personalDetails[0].dateOfBirth ||
                      personalDetails[0].maritalStatus ||
                      personalDetails[0].religion
                        ? `<div class="avoid-page-break"><h2 class="bg">
                                    <hr style="background-color: black; height: 1pt;">
                                    <b>PERSONAL DETAILS</b>
                                </h2></div>
                                 
                            ${
                              personalDetails[0].nationality
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Nationality:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].nationality}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].gender
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Sex:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].gender}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].dateOfBirth
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Date of Birth:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].dateOfBirth}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].maritalStatus
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Maritual Status:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].maritalStatus}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].religion
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Religion:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].religion}
                                        </p>
                                    </div>`
                                : ""
                            }
                                    `
                        : ""
                    }
                        ${
                          personalDetails[0].email ||
                          personalDetails[0].phoneNumber ||
                          personalDetails[0].address_ ||
                          personalDetails[0].githubAccount ||
                          personalDetails[0].linkedIn ||
                          personalDetails[0].website ||
                          personalDetails[0].portfolio
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>CONTACT DETAILS</b></h2>
                                    </div>
                                    ${
                                      personalDetails[0].email
                                        ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">E-mail:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].email}
                                            </p>
                                        </div>`
                                        : ""
                                    }
                                ${
                                  personalDetails[0].phoneNumber
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Phone Number:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].phoneNumber}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].address_
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Address:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].address_}
                                            </p>
                                        </div>`
                                    : ""
                                } 
                                
                                ${
                                  personalDetails[0].githubAccount
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">GitHub:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].githubAccount}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].linkedIn
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">LinkedIn:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].linkedIn}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].website
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Website:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].website}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].portfolio
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Portfolio:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].portfolio}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                        `
                            : ""
                        }
                        ${
                          skills.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                    <hr style="background-color: black; height: 1pt;">
                                    <b>SKILLS</b></h2>
                                </div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      .map(
                                        (skill) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill.skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          skills.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>SKILLS</b></h2></div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      .map(
                                        (skill) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill.skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          education.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>EDUCATION</b>
                                    </h2></div>
                                    ${education
                                      .map(
                                        (educationDetail) =>
                                          `<div style="margin-top: -5pt; line-height: 1;">
                                                <div class="avoid-page-break"><h3 class="text">
                                                    <b>${
                                                      educationDetail.degree
                                                    }</b>
                                                </h3></div>
                                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                                    <div class="avoid-page-break">
                                                        <h3 class="text">${
                                                          educationDetail.school
                                                        }</h3>
                                                    </div>
                                                    <div class="avoid-page-break">
                                                        <h3 class="text">${
                                                          typeof educationDetail.startDate ===
                                                          "string"
                                                            ? educationDetail.endDate
                                                            : new Date(
                                                                educationDetail.endDate
                                                              ).getFullYear()
                                                        }</h3>
                                                    </div>
                                                </div>
                                            </div>`
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          workHistory.length
                            ? `<div style="margin-top: 0pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>WORK HISTORY</b>
                                    </h2></div>
                                    ${workHistory
                                      .map(
                                        (workDetail) =>
                                          `
                                            <div class="avoid-page-break">
                                                <h3 style="font-family: Helvetica;"><b>${
                                                  workDetail.jobtitle
                                                }</b> - ${
                                            typeof workDetail.startDate ===
                                            "string"
                                              ? workDetail.startDate
                                              : new Date(workDetail.startDate)
                                                  .toDateString()
                                                  .slice(3)
                                          } to ${
                                            typeof workDetail.endDate ===
                                            "string"
                                              ? workDetail.endDate
                                              : new Date(workDetail.endDate)
                                                  .toDateString()
                                                  .slice(3)
                                          }</h3>
                                            </div>
                                            <div class="avoid-page-break">
                                                <h3 style="font-family: Helvetica; margin-top: -10pt;"><b>${
                                                  workDetail.company
                                                }</b></h3>
                                            </div>
                                                ${
                                                  workDetail.description
                                                    ? `<ul id="skills" style="margin-top: -5pt;">
                                                            ${workDetail.description
                                                              .split("\n")
                                                              .map(
                                                                (description) =>
                                                                  `<div class="avoid-page-break">
                                                                        <li class="text" style="margin-top: 5pt;">${description.slice(
                                                                          1
                                                                        )}</li>
                                                                    </div>`
                                                              )
                                                              .join("")}
                                                        </ul>`
                                                    : ""
                                                }
                                            `
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          languges.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>LANGUAGES</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${languges
                                          .map(
                                            (language) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${language.language}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          interests.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>HOBBYS / INTERESTS</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${interests
                                          .map(
                                            (interest) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${interest.interest}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          achievements.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>ACHIEVEMENTS</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${achievements
                                          .map(
                                            (achievement) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${achievement.achievement}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          references.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                    <hr style="background-color: black; height: 1pt;">
                                    <b>REFERENCES</b>
                                </h2></div>
                                ${references
                                  .map(
                                    (reference) =>
                                      `<div>
                                            ${
                                              reference.refName
                                                ? `<div class="avoid-page-break"><p>${
                                                    reference.refName
                                                  } ${`${
                                                    reference.jobTitle
                                                      ? ` - ${reference.jobTitle}`
                                                      : ""
                                                  }`}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference.companyName
                                                ? `<div class="avoid-page-break"><p style="margin-top: -10pt;">${reference.companyName}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference.address_
                                                ? reference.address_
                                                    .split(",")
                                                    .map(
                                                      (line) =>
                                                        `<div class="avoid-page-break"><p style="margin-top: -10pt;">${line}</p></div>`
                                                    )
                                                    .join("")
                                                : ""
                                            }
                                            <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                                ${
                                                  reference.email
                                                    ? `<div class="avoid-page-break"><p>E-mail: ${reference.email}</p></div>`
                                                    : ""
                                                }
                                                ${
                                                  reference.phone
                                                    ? `<div class="avoid-page-break"><p style="margin-top: -10pt;">CELL: ${reference.phone}</p></div>`
                                                    : ""
                                                }
                                            </div>
                                        </div>`
                                  )
                                  .join("")}
                            `
                            : ""
                        }
                    </div>
                </div>
            </body>
        </html>
    `;

  const template_4 = `
        <!DOCTYPE html>
        <head>
            <style>
                body {
                    padding: 0;
                    margin: 0;
                }
                @page {
                    margin-top: 40px;
                    margin-bottom: 30px;
                }  
                .bg {
                    font-family: Helvetica;
                    color: rgb(27, 35, 204);
                    font-weight: 800;
                }
                .text {
                    font-family: Helvetica;
                    font-size: 13pt;
                }
                
                #skills {
                    margin-left: 13pt;
                    padding-left: 0;
                    line-height: 1;
                }
            </style>
        </head>
        <html>
            <body>
                <div style="margin-right: 5%">
                ${
                  objective.length ||
                  personalDetails[0].profilePhoto ||
                  personalDetails[0].fullName ||
                  personalDetails[0].profession
                    ? `<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;"> 
                                <div style="display: flex; flex-direction: row; align-items: center;">
                                    <div style="background-color: blue; height: 40px; width: 35px;"></div>
                                    <div style="padding: 10px;">
                                        ${
                                          personalDetails[0].fullName
                                            ? `<h1 class="text" style="font-size: 40pt; font-weight: 800;">${personalDetails[0].fullName}</h1>`
                                            : ""
                                        }
                                        ${
                                          personalDetails[0].profession
                                            ? `<h2 style="font-size: 15pt; font-family: Arial; font-weight: 800; margin-top: -30pt;">
                                                    ${personalDetails[0].profession.toUpperCase()}
                                                </h2>`
                                            : ""
                                        }
                                    </div>
                                </div>
                                ${
                                  personalDetails[0].profilePhoto
                                    ? `<img src="data:image/png;base64,${profilePhoto}" height="120px" width="120px" style="border-radius: 100%;" />`
                                    : ""
                                }
                        </div>`
                    : ""
                }
                
                </div>
                <div style="margin-left: 5%; margin-right: 5%">
                    ${
                      objective.length
                        ? `<div style="border:groove; border-color: rgb(27, 35, 204); padding: 10px; margin-bottom: 20px;">
                                <p class="text"">${objective[0].objective}</p>
                            </div>`
                        : ""
                    }
                    <div style="column-fill: auto; column-count: 2; column-gap: 20px;">
                    ${
                      personalDetails[0].nationality ||
                      personalDetails[0].gender ||
                      personalDetails[0].dateOfBirth ||
                      personalDetails[0].maritalStatus ||
                      personalDetails[0].religion
                        ? `<div class="avoid-page-break"><h2 class="bg">
                                    <hr style="background-color: black; height: 1pt;">
                                    <b>PERSONAL DETAILS</b>
                                </h2></div>
                                 
                            ${
                              personalDetails[0].nationality
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Nationality:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].nationality}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].gender
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Sex:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].gender}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].dateOfBirth
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Date of Birth:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].dateOfBirth}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].maritalStatus
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Maritual Status:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].maritalStatus}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].religion
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Religion:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].religion}
                                        </p>
                                    </div>`
                                : ""
                            }
                                    `
                        : ""
                    }
                        ${
                          personalDetails[0].email ||
                          personalDetails[0].phoneNumber ||
                          personalDetails[0].address_ ||
                          personalDetails[0].githubAccount ||
                          personalDetails[0].linkedIn ||
                          personalDetails[0].website ||
                          personalDetails[0].portfolio
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>CONTACT DETAILS</b></h2>
                                    </div>
                                    ${
                                      personalDetails[0].email
                                        ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">E-mail:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].email}
                                            </p>
                                        </div>`
                                        : ""
                                    }
                                ${
                                  personalDetails[0].phoneNumber
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Phone Number:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].phoneNumber}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].address_
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Address:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].address_}
                                            </p>
                                        </div>`
                                    : ""
                                } 
                                
                                ${
                                  personalDetails[0].githubAccount
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">GitHub:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].githubAccount}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].linkedIn
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">LinkedIn:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].linkedIn}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].website
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Website:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].website}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].portfolio
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Portfolio:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].portfolio}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                        `
                            : ""
                        }
                        ${
                          skills.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                    <hr style="background-color: black; height: 1pt;">
                                    <b>SKILLS</b></h2>
                                </div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      .map(
                                        (skill) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill.skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          skills.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>SKILLS</b></h2></div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      .map(
                                        (skill) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill.skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          education.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>EDUCATION</b>
                                    </h2></div>
                                    ${education
                                      .map(
                                        (educationDetail) =>
                                          `<div style="margin-top: -5pt; line-height: 1;">
                                                <div class="avoid-page-break"><h3 class="text">
                                                    <b>${
                                                      educationDetail.degree
                                                    }</b>
                                                </h3></div>
                                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                                    <div class="avoid-page-break">
                                                        <h3 class="text">${
                                                          educationDetail.school
                                                        }</h3>
                                                    </div>
                                                    <div class="avoid-page-break">
                                                        <h3 class="text">${
                                                          typeof educationDetail.startDate ===
                                                          "string"
                                                            ? educationDetail.endDate
                                                            : new Date(
                                                                educationDetail.endDate
                                                              ).getFullYear()
                                                        }</h3>
                                                    </div>
                                                </div>
                                            </div>`
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          workHistory.length
                            ? `<div style="margin-top: 0pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>WORK HISTORY</b>
                                    </h2></div>
                                    ${workHistory
                                      .map(
                                        (workDetail) =>
                                          `
                                            <div class="avoid-page-break">
                                                <h3 style="font-family: Helvetica;"><b>${
                                                  workDetail.jobtitle
                                                }</b> - ${
                                            typeof workDetail.startDate ===
                                            "string"
                                              ? workDetail.startDate
                                              : new Date(workDetail.startDate)
                                                  .toDateString()
                                                  .slice(3)
                                          } to ${
                                            typeof workDetail.endDate ===
                                            "string"
                                              ? workDetail.endDate
                                              : new Date(workDetail.endDate)
                                                  .toDateString()
                                                  .slice(3)
                                          }</h3>
                                            </div>
                                            <div class="avoid-page-break">
                                                <h3 style="font-family: Helvetica; margin-top: -10pt;"><b>${
                                                  workDetail.company
                                                }</b></h3>
                                            </div>
                                                ${
                                                  workDetail.description
                                                    ? `<ul id="skills" style="margin-top: -5pt;">
                                                            ${workDetail.description
                                                              .split("\n")
                                                              .map(
                                                                (description) =>
                                                                  `<div class="avoid-page-break">
                                                                        <li class="text" style="margin-top: 5pt;">${description.slice(
                                                                          1
                                                                        )}</li>
                                                                    </div>`
                                                              )
                                                              .join("")}
                                                        </ul>`
                                                    : ""
                                                }
                                            `
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          languges.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>LANGUAGES</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${languges
                                          .map(
                                            (language) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${language.language}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          interests.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>HOBBYS / INTERESTS</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${interests
                                          .map(
                                            (interest) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${interest.interest}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          achievements.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>ACHIEVEMENTS</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${achievements
                                          .map(
                                            (achievement) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${achievement.achievement}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          references.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                    <hr style="background-color: black; height: 1pt;">
                                    <b>REFERENCES</b>
                                </h2></div>
                                ${references
                                  .map(
                                    (reference) =>
                                      `<div>
                                            ${
                                              reference.refName
                                                ? `<div class="avoid-page-break"><p>${
                                                    reference.refName
                                                  } ${`${
                                                    reference.jobTitle
                                                      ? ` - ${reference.jobTitle}`
                                                      : ""
                                                  }`}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference.companyName
                                                ? `<div class="avoid-page-break"><p style="margin-top: -10pt;">${reference.companyName}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference.address_
                                                ? reference.address_
                                                    .split(",")
                                                    .map(
                                                      (line) =>
                                                        `<div class="avoid-page-break"><p style="margin-top: -10pt;">${line}</p></div>`
                                                    )
                                                    .join("")
                                                : ""
                                            }
                                            <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                                ${
                                                  reference.email
                                                    ? `<div class="avoid-page-break"><p>E-mail: ${reference.email}</p></div>`
                                                    : ""
                                                }
                                                ${
                                                  reference.phone
                                                    ? `<div class="avoid-page-break"><p style="margin-top: -10pt;">CELL: ${reference.phone}</p></div>`
                                                    : ""
                                                }
                                            </div>
                                        </div>`
                                  )
                                  .join("")}
                            `
                            : ""
                        }
                    </div>
                </div>
            </body>
        </html>
    `;

  const template_2 = `
        <!DOCTYPE html>
        <head>
            <style>
                body {
                    padding: 0;
                    margin: 0;
                }
                @page {
                    margin-top: 40px;
                    margin-bottom: 30px;
                }
                @page:first {
                    margin-top: 0px;
                }   
                .bg {
                    background-color: rgba(0, 0, 0, 0.1);
                    font-family: Helvetica;
                }
                .text {
                    font-family: Helvetica;
                    font-size: 13pt;
                }
                
                #skills {
                    margin-left: 13pt;
                    padding-left: 0;
                    line-height: 1;
                }
            </style>
        </head>
        <html>
            <body>
                ${
                  personalDetails[0].email ||
                  personalDetails[0].phone ||
                  personalDetails[0].linkedIn
                    ? `
                            <div style="width: 100%; height: 50px;" class="bg">
                                <div style="display: flex; flex-direction: row; justify-content: space-between; width:90%; margin-left: 5%; margin-right: 5%">
                                </div>
                            </div>
                        `
                    : ""
                }
                <div style="margin-left: 5%; margin-right: 5%">
                    <div>
                        ${
                          personalDetails[0].fullName
                            ? `<h1 class="text" style="font-size: 65px; font-weight: 800;">${personalDetails[0].fullName}</h1>`
                            : ""
                        }
                        ${
                          personalDetails[0].profession
                            ? `<h2 style="font-size: 15pt; font-family: Arial; font-weight: 800; margin-top: -30pt;">
                                    ${personalDetails[0].profession.toUpperCase()}
                                </h2>`
                            : ""
                        }
                    </div>
                    ${
                      objective.length || personalDetails[0].profilePhoto
                        ? `<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: start; margin-top: -20pt;">
                                ${
                                  objective.length
                                    ? `<p class="text" style="line-height: 1.2;">${objective[0].objective}</p>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].profilePhoto
                                    ? `<img src="data:image/png;base64,${profilePhoto}" height="120px" width="120px" style="border-radius: 100%; margin-left: 10pt;" />`
                                    : ""
                                }
                            </div>`
                        : ""
                    }
                    <hr class="bg" style="height: 2pt; margin-top: 10pt;"/>
                </div>
                <div style="margin-left: 5%; margin-right: 5%">
                    <div style="column-fill: auto; column-count: 2; column-gap: 20px;">
                    ${
                      personalDetails[0].nationality ||
                      personalDetails[0].gender ||
                      personalDetails[0].dateOfBirth ||
                      personalDetails[0].maritalStatus ||
                      personalDetails[0].religion
                        ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>PERSONAL DETAILS</b></h2></div>
                                 
                            ${
                              personalDetails[0].nationality
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Nationality:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].nationality}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].gender
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Sex:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].gender}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].dateOfBirth
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Date of Birth:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].dateOfBirth}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].maritalStatus
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Maritual Status:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].maritalStatus}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].religion
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Religion:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].religion}
                                        </p>
                                    </div>`
                                : ""
                            }
                                    `
                        : ""
                    }
                        ${
                          personalDetails[0].email ||
                          personalDetails[0].phoneNumber ||
                          personalDetails[0].address_ ||
                          personalDetails[0].githubAccount ||
                          personalDetails[0].linkedIn ||
                          personalDetails[0].website ||
                          personalDetails[0].portfolio
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>CONTACT DETAILS</b></h2></div>
                                    ${
                                      personalDetails[0].email
                                        ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">E-mail:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].email}
                                            </p>
                                        </div>`
                                        : ""
                                    }
                                ${
                                  personalDetails[0].phoneNumber
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Phone Number:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].phoneNumber}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].address_
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Address:</p></b> 
                                            <p style="line-height: 1.2; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].address_}
                                            </p>
                                        </div>`
                                    : ""
                                } 
                                
                                ${
                                  personalDetails[0].githubAccount
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">GitHub:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].githubAccount}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].linkedIn
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">LinkedIn:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].linkedIn}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].website
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Website:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].website}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].portfolio
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Portfolio:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].portfolio}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                        `
                            : ""
                        }
                        ${
                          skills.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>SKILLS</b></h2></div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      .map(
                                        (skill) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill.skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          skills.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>SKILLS</b></h2></div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      .map(
                                        (skill) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill.skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          education.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>EDUCATION</b></h2></div>
                                    ${education
                                      .map(
                                        (educationDetail) =>
                                          `<div style="margin-top: -5pt; line-height: 1;">
                                                <div class="avoid-page-break"><p class="text">
                                                    <b>${
                                                      educationDetail.degree
                                                    }</b>
                                                </p></div>
                                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                                    <div class="avoid-page-break">
                                                        <p class="text">${educationDetail.school.toUpperCase()}</p>
                                                    </div>
                                                    <div class="avoid-page-break">
                                                        <h3 class="text">${
                                                          typeof educationDetail.startDate ===
                                                          "string"
                                                            ? educationDetail.endDate
                                                            : new Date(
                                                                educationDetail.endDate
                                                              ).getFullYear()
                                                        }</h3>
                                                    </div>
                                                </div>
                                            </div>`
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          workHistory.length
                            ? `<div style="margin-top: 0pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>WORK HISTORY</b></h2></div>
                                    ${workHistory
                                      .map(
                                        (workDetail) =>
                                          `
                                            <div class="avoid-page-break">
                                                <p style="font-family: Helvetica;"><b>${
                                                  workDetail.jobtitle
                                                }</b> - ${
                                            typeof workDetail.startDate ===
                                            "string"
                                              ? workDetail.startDate
                                              : new Date(workDetail.startDate)
                                                  .toDateString()
                                                  .slice(3)
                                          } to ${
                                            typeof workDetail.endDate ===
                                            "string"
                                              ? workDetail.endDate
                                              : new Date(workDetail.endDate)
                                                  .toDateString()
                                                  .slice(3)
                                          }</p>
                                            </div>
                                            <div class="avoid-page-break">
                                                <p style="font-family: Helvetica; margin-top: -10pt;">${workDetail.company.toUpperCase()}</p>
                                            </div>
                                                ${
                                                  workDetail.description
                                                    ? `<ul id="skills" style="margin-top: -5pt;">
                                                            ${workDetail.description
                                                              .split("\n")
                                                              .map(
                                                                (description) =>
                                                                  `<div class="avoid-page-break">
                                                                        <li class="text" style="margin-top: 5pt;">${description.slice(
                                                                          1
                                                                        )}</li>
                                                                    </div>`
                                                              )
                                                              .join("")}
                                                        </ul>`
                                                    : ""
                                                }
                                            `
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          languges.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <b>LANGUAGES</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${languges
                                          .map(
                                            (language) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${language.language}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          interests.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <b>HOBBYS / INTERESTS</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${interests
                                          .map(
                                            (interest) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${interest.interest}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          achievements.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <b>ACHIEVEMENTS</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${achievements
                                          .map(
                                            (achievement) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${achievement.achievement}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          references.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                    <b>REFERENCES</b>
                                </h2></div>
                                ${references
                                  .map(
                                    (reference) =>
                                      `<div>
                                            ${
                                              reference.refName
                                                ? `<div class="avoid-page-break"><p class="text">${
                                                    reference.refName
                                                  } ${`${
                                                    reference.jobTitle
                                                      ? ` - ${reference.jobTitle}`
                                                      : ""
                                                  }`}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference.companyName
                                                ? `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">${reference.companyName}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference.address_
                                                ? reference.address_
                                                    .split(",")
                                                    .map(
                                                      (line) =>
                                                        `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">${line}</p></div>`
                                                    )
                                                    .join("")
                                                : ""
                                            }
                                            <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                                ${
                                                  reference.email
                                                    ? `<div class="avoid-page-break"><p class="text">E-mail: ${reference.email}</p></div>`
                                                    : ""
                                                }
                                                ${
                                                  reference.phone
                                                    ? `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">CELL: ${reference.phone}</p></div>`
                                                    : ""
                                                }
                                            </div>
                                        </div>`
                                  )
                                  .join("")}
                            `
                            : ""
                        }
                    </div>
                </div>
            </body>
        </html>
    `;
  const template_5 = `
        <!DOCTYPE html>
        <head>
            <style>
                body {
                    padding: 0;
                    margin: 0;
                }
                @page {
                    margin-top: 40px;
                    margin-bottom: 30px;
                }
                @page:first {
                    margin-top: 0px;
                }   
                .bg {
                    background-color: rgba(0, 0, 0, 0.1);
                    font-family: Helvetica;
                }
                .text {
                    font-family: Helvetica;
                    font-size: 13pt;
                }
                
                #skills {
                    margin-left: 13pt;
                    padding-left: 0;
                    line-height: 1;
                }
            </style>
        </head>
        <html>
            <body>
                ${
                  personalDetails[0].email ||
                  personalDetails[0].phone ||
                  personalDetails[0].linkedIn
                    ? `
                            <div style="width: 100%; height: 50px;" class="bg">
                                <div style="display: flex; flex-direction: row; justify-content: space-between; width:90%; margin-left: 5%; margin-right: 5%">
                                </div>
                            </div>
                        `
                    : ""
                }
                <div style="margin-left: 5%; margin-right: 5%">
                    <div>
                        ${
                          personalDetails[0].fullName
                            ? `<h1 class="text" style="font-size: 65px; font-weight: 800;">${personalDetails[0].fullName}</h1>`
                            : ""
                        }
                        ${
                          personalDetails[0].profession
                            ? `<h2 style="font-size: 15pt; font-family: Arial; font-weight: 800; margin-top: -35pt;">
                                    ${personalDetails[0].profession.toUpperCase()}
                                </h2>`
                            : ""
                        }
                    </div>
                    ${
                      objective.length || personalDetails[0].profilePhoto
                        ? `<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-top: -20pt;">
                                ${
                                  objective.length
                                    ? `<p class="text">${objective[0].objective}</p>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].profilePhoto
                                    ? `<img src="data:image/png;base64,${profilePhoto}" height="120px" width="120px" style="border-radius: 100%; margin-left: 10pt;" />`
                                    : ""
                                }
                            </div>`
                        : ""
                    }
                    <hr class="bg" style="height: 2pt; margin-top: 10pt;"/>
                </div>
                <div style="margin-left: 5%; margin-right: 5%">
                    <div style="">
                    ${
                      personalDetails[0].nationality ||
                      personalDetails[0].gender ||
                      personalDetails[0].dateOfBirth ||
                      personalDetails[0].maritalStatus ||
                      personalDetails[0].religion
                        ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>PERSONAL DETAILS</b></h2></div>
                                 
                            ${
                              personalDetails[0].nationality
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Nationality:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].nationality}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].gender
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Sex:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].gender}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].dateOfBirth
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Date of Birth:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].dateOfBirth}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].maritalStatus
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Maritual Status:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].maritalStatus}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].religion
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Religion:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].religion}
                                        </p>
                                    </div>`
                                : ""
                            }
                                    `
                        : ""
                    }
                        ${
                          personalDetails[0].email ||
                          personalDetails[0].phoneNumber ||
                          personalDetails[0].address_ ||
                          personalDetails[0].githubAccount ||
                          personalDetails[0].linkedIn ||
                          personalDetails[0].website ||
                          personalDetails[0].portfolio
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>CONTACT DETAILS</b></h2></div>
                                    ${
                                      personalDetails[0].email
                                        ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">E-mail:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].email}
                                            </p>
                                        </div>`
                                        : ""
                                    }
                                ${
                                  personalDetails[0].phoneNumber
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Phone Number:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].phoneNumber}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].address_
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Address:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].address_}
                                            </p>
                                        </div>`
                                    : ""
                                } 
                                
                                ${
                                  personalDetails[0].githubAccount
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">GitHub:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].githubAccount}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].linkedIn
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">LinkedIn:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].linkedIn}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].website
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Website:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].website}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].portfolio
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Portfolio:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].portfolio}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                        `
                            : ""
                        }
                        ${
                          skills.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>SKILLS</b></h2></div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      .map(
                                        (skill) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill.skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          skills.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>SKILLS</b></h2></div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      .map(
                                        (skill) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill.skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          education.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>EDUCATION</b></h2></div>
                                    ${education
                                      .map(
                                        (educationDetail) =>
                                          `<div style="margin-top: -5pt; line-height: 1;">
                                                <div class="avoid-page-break"><p class="text">
                                                    <b>${
                                                      educationDetail.degree
                                                    }</b>
                                                </p></div>
                                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                                    <div class="avoid-page-break">
                                                        <p class="text">${educationDetail.school.toUpperCase()}</p>
                                                    </div>
                                                    <div class="avoid-page-break">
                                                        <p class="text">${
                                                          typeof educationDetail.startDate ===
                                                          "string"
                                                            ? educationDetail.endDate
                                                            : new Date(
                                                                educationDetail.endDate
                                                              ).getFullYear()
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>`
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          workHistory.length
                            ? `<div style="margin-top: 0pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>WORK HISTORY</b></h2></div>
                                    ${workHistory
                                      .map(
                                        (workDetail) =>
                                          `
                                            <div class="avoid-page-break">
                                                <h3 style="font-family: Helvetica;"><b>${
                                                  workDetail.jobtitle
                                                }</b> - ${
                                            typeof workDetail.startDate ===
                                            "string"
                                              ? workDetail.startDate
                                              : new Date(workDetail.startDate)
                                                  .toDateString()
                                                  .slice(3)
                                          } to ${
                                            typeof workDetail.endDate ===
                                            "string"
                                              ? workDetail.endDate
                                              : new Date(workDetail.endDate)
                                                  .toDateString()
                                                  .slice(3)
                                          }</h3>
                                            </div>
                                            <div class="avoid-page-break">
                                                <p style="font-family: Helvetica; margin-top: -10pt;">${workDetail.company.toUpperCase()}</p>
                                            </div>
                                                ${
                                                  workDetail.description
                                                    ? `<ul id="skills" style="margin-top: -5pt;">
                                                            ${workDetail.description
                                                              .split("\n")
                                                              .map(
                                                                (description) =>
                                                                  `<div class="avoid-page-break">
                                                                        <li class="text" style="margin-top: 5pt;">${description.slice(
                                                                          1
                                                                        )}</li>
                                                                    </div>`
                                                              )
                                                              .join("")}
                                                        </ul>`
                                                    : ""
                                                }
                                            `
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          languges.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <b>LANGUAGES</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${languges
                                          .map(
                                            (language) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${language.language}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          interests.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <b>HOBBYS / INTERESTS</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${interests
                                          .map(
                                            (interest) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${interest.interest}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          achievements.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <b>ACHIEVEMENTS</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${achievements
                                          .map(
                                            (achievement) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${achievement.achievement}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          references.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                    <b>REFERENCES</b>
                                </h2></div>
                                ${references
                                  .map(
                                    (reference) =>
                                      `<div>
                                            ${
                                              reference.refName
                                                ? `<div class="avoid-page-break"><p class="text">${
                                                    reference.refName
                                                  } ${`${
                                                    reference.jobTitle
                                                      ? ` - ${reference.jobTitle}`
                                                      : ""
                                                  }`}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference.companyName
                                                ? `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">${reference.companyName}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference.address_
                                                ? reference.address_
                                                    .split(",")
                                                    .map(
                                                      (line) =>
                                                        `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">${line}</p></div>`
                                                    )
                                                    .join("")
                                                : ""
                                            }
                                            <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                                ${
                                                  reference.email
                                                    ? `<div class="avoid-page-break"><p class="text">E-mail: ${reference.email}</p></div>`
                                                    : ""
                                                }
                                                ${
                                                  reference.phone
                                                    ? `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">CELL: ${reference.phone}</p></div>`
                                                    : ""
                                                }
                                            </div>
                                        </div>`
                                  )
                                  .join("")}
                            `
                            : ""
                        }
                    </div>
                </div>
            </body>
        </html>
    `;

  const template_1 = `
    <!DOCTYPE html>
    <head>
        <style>
            
           @page {
                margin-left: 40px;
                margin-right: 40px;
                margin-top: 30px;
                margin-bottom: 40px;
            }
            
            .text {
                font-size: 12pt;
                font-family: Arial;
            }

            .hr {
                background-color: black;
                height: 1pt;
                margin-top: 0pt;
            }
            .subHeading {
                font-size: 15pt;
                font-family: Arial;
                background-color: rgba(0, 0, 0, 0.3);
                width: fit-content; 
                padding: 5px;
            }

            #skills {
                margin-left: 15pt;
                padding-left: 0;
                line-height: 1;
            }
            .avoid-page-break {
                page-break-inside: avoid;
            }
        </style>
    </head>
    <html>        
        <body style=">
             
            ${
              personalDetails
                ? `
                        <div style="line-height: 0;">
                            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                    ${
                                      personalDetails[0].profilePhoto
                                        ? `
                                                <img src="data:image/png;base64,${profilePhoto}" height="120px" width="120px" style="border-radius: 100%; align-self: center;"/>
                                            `
                                        : ""
                                    }
                            </div>
                            <h1 style="text-align: center; font-weight: 800; font-family: 'Times New Roman'; margin-bottom: 20pt;">
                                CURRICURUM VITAE
                            </h1>
                            ${
                              personalDetails[0].email ||
                              personalDetails[0].phone ||
                              personalDetails[0].address_ ||
                              personalDetails[0].linkedIn ||
                              personalDetails[0].gitHub ||
                              personalDetails[0].website
                                ? `<div>
                                        <div class="avoid-page-break"><h2 class="subHeading">
                                            <b>CONTACT DETAILS</b>
                                        </h2></div>
                                        <div style="margin-top: -10pt;">
                                            ${
                                              personalDetails[0].phone
                                                ? `<div style="display: flex; flex-direction: row; align-items: center;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">Cellphone</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p>${personalDetails[0].phone}</p>
                                                    </div>`
                                                : ""
                                            }
                                            ${
                                              personalDetails[0].email
                                                ? `<div style="display: flex; flex-direction: row; align-items: center;  margin-top: -15pt;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">E-mail</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p>${personalDetails[0].email}</p>
                                                    </div>`
                                                : ""
                                            }
                                            ${
                                              personalDetails[0].address_
                                                ? `<div style="display: flex; flex-direction: row; align-items: center; margin-top: -15pt;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">Address</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p>${personalDetails[0].address_}</p>
                                                    </div>`
                                                : ""
                                            }
                                            ${
                                              personalDetails[0].linkedIn
                                                ? `<div style="display: flex; flex-direction: row; align-items: center; margin-top: -15pt;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">LinkedIn</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p>${personalDetails[0].linkedIn}</p>
                                                    </div>`
                                                : ""
                                            }
                                            ${
                                              personalDetails[0].gitHub
                                                ? `<div style="display: flex; flex-direction: row; align-items: center; margin-top: -15pt;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">Git-Hub</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p>${personalDetails[0].gitHub}</p>
                                                    </div>`
                                                : ""
                                            }
                                            ${
                                              personalDetails[0].portfolio
                                                ? `<div style="display: flex; flex-direction: row; align-items: center; margin-top: -15pt;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">PortFolio</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p>${personalDetails[0].portfolio}</p>
                                                    </div>`
                                                : ""
                                            }
                                            ${
                                              personalDetails[0].website
                                                ? `<div style="display: flex; flex-direction: row; align-items: center; margin-top: -15pt;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">Website</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p>${personalDetails[0].website}</p>
                                                    </div>`
                                                : ""
                                            }
                                        </div>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].fullName ||
                              personalDetails[0].gender ||
                              personalDetails[0].maritalStatus ||
                              personalDetails[0].dateOfBirth ||
                              personalDetails[0].nationality ||
                              personalDetails[0].religion
                                ? `<div>
                                        <div class="avoid-page-break"><h2 class="subHeading">
                                            <b>PERSONAL DETAILS</b>
                                        </h2></div>
                                        <div style="margin-top: -10pt;">
                                            ${
                                              personalDetails[0].fullName
                                                ? `<div style="display: flex; flex-direction: row; align-items: center;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">Full Name</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p>${personalDetails[0].fullName}</p>
                                                    </div>`
                                                : ""
                                            }
                                            ${
                                              personalDetails[0].gender
                                                ? `<div style="display: flex; flex-direction: row; align-items: center;  margin-top: -15pt;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">Sex</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p>${personalDetails[0].gender}</p>
                                                    </div>`
                                                : ""
                                            }
                                            ${
                                              personalDetails[0].maritalStatus
                                                ? `<div style="display: flex; flex-direction: row; align-items: center; margin-top: -15pt;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">Marital Status</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p>${personalDetails[0].maritalStatus}</p>
                                                    </div>`
                                                : ""
                                            }
                                            ${
                                              personalDetails[0].dateOfBirth
                                                ? `<div style="display: flex; flex-direction: row; align-items: center; margin-top: -15pt;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">Date Of Birth</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p>${personalDetails[0].dateOfBirth}</p>
                                                    </div>`
                                                : ""
                                            }
                                            ${
                                              personalDetails[0].nationality
                                                ? `<div style="display: flex; flex-direction: row; align-items: center; margin-top: -15pt;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">Nationality</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p>${personalDetails[0].nationality}</p>
                                                    </div>`
                                                : ""
                                            }
                                            ${
                                              personalDetails[0].religion
                                                ? `<div style="display: flex; flex-direction: row; align-items: center; margin-top: -15pt;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">Website</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p>${personalDetails[0].reigion}</p>
                                                    </div>`
                                                : ""
                                            }
                                        </div>
                                    </div>`
                                : ""
                            }
                        </div>
                    `
                : ""
            }
            ${
              objective.length
                ? objective[0].objective
                  ? `<div style="margin-top: 10pt;">
                            <div class="avoid-page-break"><h2 class="subHeading">
                                <b>CAREER SUMMARY</b>
                            </h2></div>
                            <div class="avoid-page-break"><p class="text" style="margin-top: -5pt;">
                                ${objective[0].objective}
                            </p></div>
                        </div>`
                  : ""
                : ""
            }
            ${
              skills.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>SKILLS</b>
                        </h2></div>
                            <ul id="skills" style="margin-top: -5pt;">
                                ${skills
                                  .map(
                                    (skill) =>
                                      `<div class="avoid-page-break">
                                            <li class="text" style="margin-top: 5pt;">${skill.skill}</li>
                                        </div>`
                                  )
                                  .join("")}
                            </ul>
                    </div>`
                : ""
            }
            ${
              education.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>EDUCATION</b>
                        </h2></div>
                        ${education
                          .map(
                            (educationDetail) =>
                              `<div style="margin-top: -5pt; line-height: 1;">
                                    <div class="avoid-page-break"><p class="text">
                                        <b>${educationDetail.degree}</b>
                                    </p></div>
                                    <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                        <div class="avoid-page-break"><p class="text">${
                                          educationDetail.school
                                        }</p></div>
                                        <div class="avoid-page-break">
                                            <p class="text">(${
                                              typeof educationDetail.startDate ===
                                              "string"
                                                ? educationDetail.startDate
                                                : new Date(
                                                    educationDetail.startDate
                                                  )
                                                    .toDateString()
                                                    .slice(3)
                                            } to ${
                                typeof educationDetail.endDate === "string"
                                  ? educationDetail.endDate
                                  : new Date(educationDetail.endDate)
                                      .toDateString()
                                      .slice(3)
                              })</p>
                                        </div>
                                    </div>
                                </div>`
                          )
                          .join("")}
                    </div>`
                : ""
            }
            ${
              workHistory.length
                ? `<div style="margin-top: 0pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>WORK EXPERIENCE</b>
                        </h2></div>
                        ${workHistory
                          .map(
                            (workDetail) =>
                              `
                                ${
                                  workDetail.company
                                    ? `
                                            <div style="display: flex; flex-direction: row; align-items: center; margin-top: -10pt;">
                                                    <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                        <p class="text" style="font-weight: 800;">Organization</p><p style="margin-right: 20px;">:</p>
                                                    </div>
                                                    <p>${workDetail.company}</p>
                                            </div>
                                        `
                                    : ""
                                }
                                ${
                                  workDetail.jobtitle
                                    ? `
                                            <div style="display: flex; flex-direction: row; align-items: center; margin-top: -20pt;">
                                                    <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                        <p class="text" style="font-weight: 800;">Poisition</p><p style="margin-right: 20px;">:</p>
                                                    </div>
                                                    <p>${workDetail.jobtitle}</p>
                                            </div>
                                        `
                                    : ""
                                }
                                ${
                                  workDetail.startDate || workDetail.endDate
                                    ? `
                                            <div style="display: flex; flex-direction: row; align-items: center; margin-top: -20pt;">
                                                    <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                        <p class="text" style="font-weight: 800;">Duration</p><p style="margin-right: 20px;">:</p>
                                                    </div>
                                                    <p>${
                                                      typeof workDetail.startDate ===
                                                      "string"
                                                        ? workDetail.startDate
                                                        : new Date(
                                                            workDetail.startDate
                                                          )
                                                            .toDateString()
                                                            .slice(3)
                                                    } to ${
                                        typeof workDetail.endDate === "string"
                                          ? workDetail.endDate
                                          : new Date(workDetail.endDate)
                                              .toDateString()
                                              .slice(3)
                                      }</p>
                                            </div>
                                        `
                                    : ""
                                }
                                ${
                                  workDetail.description
                                    ? `
                                            <div style="margin-top: -10pt; line-height: 0.5; margin-bottom: 20pt;">
                                                <div class="avoid-page-break"><p><b>Description:</b></p></div>
                                                    ${
                                                      workDetail.description
                                                        ? workDetail.description
                                                            .split("\n")
                                                            .map(
                                                              (detail) =>
                                                                `<div class="avoid-page-break"><p class="text">${detail}</p></div>`
                                                            )
                                                            .join("")
                                                        : ""
                                                    }
                                            </div>
                                        `
                                    : ""
                                }
                                `
                          )
                          .join("")}
                    </div>`
                : ""
            }
            ${
              languges.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>LANGUAGES</b>
                        </h2></div>
                        <ul id="skills" style="margin-top: -5pt;">
                            ${languges
                              .map(
                                (language) =>
                                  `<div class="avoid-page-break">
                                        <li class="text" style="margin-top: 5pt;">${language.language}</li>
                                    </div>`
                              )
                              .join("")}
                        </ul>
                    </div>`
                : ""
            }
            ${
              interests.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>HOBBYS / INTERESTS</b>
                        </h2></div>
                        <ul id="skills" style="margin-top: -5pt;">
                            ${interests
                              .map(
                                (interest) =>
                                  `<div class="avoid-page-break">
                                        <li class="text" style="margin-top: 5pt;">${interest.interest}</li>
                                    </div>`
                              )
                              .join("")}
                        </ul>
                    </div>`
                : ""
            }
            ${
              achievements.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>ACHIEVEMENTS</b>
                        </h2></div>
                        <ul id="skills" style="margin-top: -5pt;">
                            ${achievements
                              .map(
                                (achievement) =>
                                  `<div class="avoid-page-break">
                                        <li class="text" style="margin-top: 5pt;">${achievement.achievement}</li>
                                    `
                              )
                              .join("")}
                        </ul>
                    </div>`
                : ""
            }
            ${
              references.length
                ? `<h2 class="subHeading">
                        <b>REFERENCES</b>
                    </h2>
                    ${references
                      .map(
                        (reference) =>
                          `<div>
                                ${
                                  reference.refName
                                    ? `<p>${reference.refName} ${
                                        reference.jobTitle
                                          ? ` - ${reference.jobTitle}`
                                          : ""
                                      }</p>`
                                    : ""
                                }
                                ${
                                  reference.companyName
                                    ? `<p style="margin-top: -10pt;">${reference.companyName}</p>`
                                    : ""
                                }
                                ${
                                  reference.address_
                                    ? reference.address_
                                        .split(",")
                                        .map(
                                          (line) =>
                                            `<p style="margin-top: -10pt;">${line}</p>`
                                        )
                                        .join("")
                                    : ""
                                }
                                <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                    ${
                                      reference.email
                                        ? `<p>E-mail: ${reference.email}</p>`
                                        : ""
                                    }
                                    ${
                                      reference.phone
                                        ? `<p style="margin-top: -10pt;">CELL: ${reference.phone}</p>`
                                        : ""
                                    }
                                </div>
                            </div>`
                      )
                      .join("")}
                `
                : ""
            }
        </body>
    </html>

    `;

  const template_8 = `
        <!DOCTYPE html>
        <head>
            <style>
                body {
                    padding: 0;
                    margin: 0;
                }
                @page {
                    margin-top: 40px;
                    margin-bottom: 30px;
                }
                @page:first {
                    margin-top: 0px;
                }   
                .bg {
                    background-color: #FCA049;
                    font-family: Helvetica;
                }
                .text {
                    font-family: Helvetica;
                    font-size: 13pt;
                }
                
                #skills {
                    margin-left: 13pt;
                    padding-left: 0;
                    line-height: 1;
                }
            </style>
        </head>
        <html>
            <body>
                ${
                  personalDetails[0].email ||
                  personalDetails[0].phone ||
                  personalDetails[0].linkedIn
                    ? `
                            <div style="width: 100%; height: 50px;" class="bg">
                                <div style="display: flex; flex-direction: row; justify-content: space-between; width:90%; margin-left: 5%; margin-right: 5%">
                                </div>
                            </div>
                        `
                    : ""
                }
                <div style="margin-left: 5%; margin-right: 5%">
                    <div>
                        ${
                          personalDetails[0].fullName
                            ? `<h1 class="text" style="font-size: 65px; font-weight: 800;">${personalDetails[0].fullName}</h1>`
                            : ""
                        }
                        ${
                          personalDetails[0].profession
                            ? `<h2 style="font-size: 15pt; font-family: Arial; font-weight: 800; margin-top: -35pt;">
                                    ${personalDetails[0].profession.toUpperCase()}
                                </h2>`
                            : ""
                        }
                    </div>
                    ${
                      objective.length || personalDetails[0].profilePhoto
                        ? `<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-top: -20pt;">
                                ${
                                  objective.length
                                    ? `<p>${objective[0].objective}</p>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].profilePhoto
                                    ? `<img src="data:image/png;base64,${profilePhoto}" height="120px" width="120px" style="border-radius: 100%; margin-left: 10pt;" />`
                                    : ""
                                }
                            </div>`
                        : ""
                    }
                    <hr class="bg" style="height: 2pt; margin-top: 10pt;"/>
                </div>
                <div style="margin-left: 5%; margin-right: 5%">
                    <div style="">
                    ${
                      personalDetails[0].nationality ||
                      personalDetails[0].gender ||
                      personalDetails[0].dateOfBirth ||
                      personalDetails[0].maritalStatus ||
                      personalDetails[0].religion
                        ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>PERSONAL DETAILS</b></h2></div>
                                 
                            ${
                              personalDetails[0].nationality
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Nationality:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].nationality}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].gender
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Sex:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].gender}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].dateOfBirth
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Date of Birth:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].dateOfBirth}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].maritalStatus
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Maritual Status:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].maritalStatus}
                                        </p>
                                    </div>`
                                : ""
                            }
                            ${
                              personalDetails[0].religion
                                ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Religion:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails[0].religion}
                                        </p>
                                    </div>`
                                : ""
                            }
                                    `
                        : ""
                    }
                        ${
                          personalDetails[0].email ||
                          personalDetails[0].phoneNumber ||
                          personalDetails[0].address_ ||
                          personalDetails[0].githubAccount ||
                          personalDetails[0].linkedIn ||
                          personalDetails[0].website ||
                          personalDetails[0].portfolio
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>CONTACT DETAILS</b></h2></div>
                                    ${
                                      personalDetails[0].email
                                        ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">E-mail:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].email}
                                            </p>
                                        </div>`
                                        : ""
                                    }
                                ${
                                  personalDetails[0].phoneNumber
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Phone Number:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].phoneNumber}
                                            </p>
                                        </div>
                                        `
                                    : ""
                                }
                                ${
                                  personalDetails[0].address_
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Address:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].address_}
                                            </p>
                                        </div>`
                                    : ""
                                } 
                                
                                ${
                                  personalDetails[0].githubAccount
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">GitHub:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].githubAccount}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].linkedIn
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">LinkedIn:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].linkedIn}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].website
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Website:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].website}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails[0].portfolio
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Portfolio:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails[0].portfolio}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                        `
                            : ""
                        }
                        ${
                          skills.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>SKILLS</b></h2></div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      .map(
                                        (skill) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill.skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          skills.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>SKILLS</b></h2></div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      .map(
                                        (skill) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill.skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          education.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>EDUCATION</b></h2></div>
                                    ${education
                                      .map(
                                        (educationDetail) =>
                                          `<div style="margin-top: -5pt; line-height: 1;">
                                                <div class="avoid-page-break"><p class="text">
                                                    <b>${
                                                      educationDetail.degree
                                                    }</b>
                                                </p></div>
                                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                                    <div class="avoid-page-break">
                                                        <p class="text">${educationDetail.school.toUpperCase()}</p>
                                                    </div>
                                                    <div class="avoid-page-break">
                                                        <p class="text">${
                                                          typeof educationDetail.startDate ===
                                                          "string"
                                                            ? educationDetail.endDate
                                                            : new Date(
                                                                educationDetail.endDate
                                                              ).getFullYear()
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>`
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          workHistory.length
                            ? `<div style="margin-top: 0pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>WORK HISTORY</b></h2></div>
                                    ${workHistory
                                      .map(
                                        (workDetail) =>
                                          `
                                            <div class="avoid-page-break">
                                                <p style="font-family: Helvetica;"><b>${
                                                  workDetail.jobtitle
                                                }</b> - ${
                                            typeof workDetail.startDate ===
                                            "string"
                                              ? workDetail.startDate
                                              : new Date(workDetail.startDate)
                                                  .toDateString()
                                                  .slice(3)
                                          } to ${
                                            typeof workDetail.endDate ===
                                            "string"
                                              ? workDetail.endDate
                                              : new Date(workDetail.endDate)
                                                  .toDateString()
                                                  .slice(3)
                                          }</p>
                                            </div>
                                            <div class="avoid-page-break">
                                                <p class="text" style="font-family: Helvetica; margin-top: -10pt;">${workDetail.company.toUpperCase()}</p>
                                            </div>
                                                ${
                                                  workDetail.description
                                                    ? `<ul id="skills" style="margin-top: -5pt;">
                                                            ${workDetail.description
                                                              .split("\n")
                                                              .map(
                                                                (description) =>
                                                                  `<div class="avoid-page-break">
                                                                        <li class="text" style="margin-top: 5pt;">${description.slice(
                                                                          1
                                                                        )}</li>
                                                                    </div>`
                                                              )
                                                              .join("")}
                                                        </ul>`
                                                    : ""
                                                }
                                            `
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          languges.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <b>LANGUAGES</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${languges
                                          .map(
                                            (language) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${language.language}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          interests.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <b>HOBBYS / INTERESTS</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${interests
                                          .map(
                                            (interest) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${interest.interest}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          achievements.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                        <b>ACHIEVEMENTS</b>
                                    </h2></div>
                                    <ul id="skills" style="margin-top: -5pt;">
                                        ${achievements
                                          .map(
                                            (achievement) =>
                                              `<div class="avoid-page-break"><li class="text" style="margin-top: 5pt;">${achievement.achievement}</li></div>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>`
                            : ""
                        }
                        ${
                          references.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                    <b>REFERENCES</b>
                                </h2></div>
                                ${references
                                  .map(
                                    (reference) =>
                                      `<div>
                                            ${
                                              reference.refName
                                                ? `<div class="avoid-page-break"><p class="text">${
                                                    reference.refName
                                                  } ${`${
                                                    reference.jobTitle
                                                      ? ` - ${reference.jobTitle}`
                                                      : ""
                                                  }`}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference.companyName
                                                ? `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">${reference.companyName}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference.address_
                                                ? reference.address_
                                                    .split(",")
                                                    .map(
                                                      (line) =>
                                                        `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">${line}</p></div>`
                                                    )
                                                    .join("")
                                                : ""
                                            }
                                            <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                                ${
                                                  reference.email
                                                    ? `<div class="avoid-page-break"><p class="text">E-mail: ${reference.email}</p></div>`
                                                    : ""
                                                }
                                                ${
                                                  reference.phone
                                                    ? `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">CELL: ${reference.phone}</p></div>`
                                                    : ""
                                                }
                                            </div>
                                        </div>`
                                  )
                                  .join("")}
                            `
                            : ""
                        }
                    </div>
                </div>
            </body>
        </html>
    `;

  return {
    template_1,
    template_2,
    template_3,
    template_4,
    template_5,
    template_6,
    template_7,
    template_8,
    template_9,
  };
};
