const express = require("express");
const User = require("../../model/User");
const NavItems = require("../../model/NavItems");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { required } = require("yargs");
const { json, raw } = require("body-parser");
const Title = require("../../model/Title");
const NavItem1 = require("../../model/NavItem1");
const NavItem2 = require("../../model/NavItem2");
const NavItem3 = require("../../model/NavItem3");
const NavItem4 = require("../../model/NavItem4");
const Category = require("../../model/Category");
const Category_Details = require("../../model/Category_Details");
const Creative = require("../../model/Creative");
const Advisor = require("../../model/Advisor");
const CreativeTeam = require("../../model/CreativeTeam");
const AdvisorTeam = require("../../model/AdvisorTeam");
const SubNavItem1_6 = require("../../model/SubNavItem1_6");
const SubNavItem2_6 = require("../../model/SubNavItem2_6");
const SubNavItem3_6 = require("../../model/SubNavItem3_6");
const SubNavItem4_6 = require("../../model/SubNavItem3_6");
const Question_Category = require("../../model/Question_Category");
const QuestionAnswer = require("../../model/QuestionAnswer");
const Solution_Category = require("../../model/Solution_Category");
const Solution_Details = require("../../model/Solution_Details");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.session);
  if (req.session.loggedin) {
    Title.findAll()
      .then((title) => {
        //console.log(title);
        NavItems.findAll()
          .then((nitem) => {
            NavItem1.findAll()
              .then((navitem1) => {
                NavItem2.findAll()
                  .then((navitem2) => {
                    NavItem3.findAll()
                      .then((navitem3) => {
                        //console.log(navitem3);
                        //console.log(typeof(navitem3))
                        NavItem4.findAll()
                          .then((navitem4) => {
                            //console.log(navitem4);

                            //console.log(category)
                            Creative.findAll()
                              .then((creative) => {
                                Advisor.findAll()
                                  .then((advisor) => {
                                    CreativeTeam.findAll()
                                      .then((creativeteam) => {
                                        AdvisorTeam.findAll()
                                          .then((advisorteam) => {
                                            SubNavItem1_6.findAll()
                                              .then((subnavitem1_6) => {
                                                SubNavItem2_6.findAll()
                                                  .then((subnavitem2_6) => {
                                                    SubNavItem3_6.findAll()
                                                      .then((subnavitem3_6) => {
                                                        Question_Category.findAll(
                                                          {
                                                            include: [
                                                              {
                                                                model:
                                                                  QuestionAnswer,
                                                                required: true,
                                                              },
                                                            ],
                                                          }
                                                        )
                                                          .then((qcategory) => {
                                                            //console.log(JSON.stringify(qcategory, null, 2));
                                                            Solution_Category.findAll(
                                                              {
                                                                include: [
                                                                  {
                                                                    model:
                                                                      Solution_Details,
                                                                    required: true,
                                                                  },
                                                                ],
                                                              }
                                                            )
                                                              .then(
                                                                (s_details) => {
                                                                  //console.log(JSON.stringify(s_details, null, 2));
                                                                  Category.findAll(
                                                                    {
                                                                      include: [
                                                                        {
                                                                          model:
                                                                            Category_Details,
                                                                          required: true,
                                                                        },
                                                                      ],
                                                                    }
                                                                  ).then(
                                                                    (
                                                                      wcategory
                                                                    ) => {
                                                                      //console.log(JSON.stringify(wcategory, null, 2));
                                                                      res.render(
                                                                        "home/index",
                                                                        {
                                                                          layout:
                                                                            "page-layout",
                                                                          title,
                                                                          nitem,
                                                                          navitem1,
                                                                          navitem2,
                                                                          navitem3,
                                                                          navitem4,
                                                                          //category,
                                                                          creative,
                                                                          advisor,
                                                                          creativeteam,
                                                                          advisorteam,
                                                                          subnavitem1_6,
                                                                          subnavitem2_6,
                                                                          subnavitem3_6,

                                                                          qcategory,
                                                                          s_details,
                                                                          wcategory,
                                                                          email:
                                                                            req
                                                                              .session
                                                                              .email,
                                                                          name: req
                                                                            .session
                                                                            .name,
                                                                        }
                                                                      );
                                                                    }
                                                                  );
                                                                  //console.log(JSON.stringify(s_details, null, 2));
                                                                }
                                                              )
                                                              .catch((err) =>
                                                                console.log(err)
                                                              );
                                                          })
                                                          .catch((err) =>
                                                            console.log(err)
                                                          );
                                                      })
                                                      .catch((err) =>
                                                        console.log(err)
                                                      );
                                                  })
                                                  .catch((err) =>
                                                    console.log(err)
                                                  );
                                              })
                                              .catch((err) => console.log(err));
                                          })
                                          .catch((err) => console.log(err));
                                      })
                                      .catch((err) => console.log(err));
                                  })
                                  .catch((err) => console.log(err));
                              })
                              .catch((err) => console.log(err));
                          })

                          .catch((err) => console.log(err));
                      })

                      .catch((err) => console.log(err));
                  })

                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));

            //console.log(nitem);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } else {
    Title.findAll()
      .then((title) => {
        //console.log(title);
        NavItems.findAll()
          .then((nitem) => {
            NavItem1.findAll()
              .then((navitem1) => {
                NavItem2.findAll()
                  .then((navitem2) => {
                    NavItem3.findAll()
                      .then((navitem3) => {
                        //console.log(navitem3);
                        //console.log(typeof(navitem3))
                        NavItem4.findAll()
                          .then((navitem4) => {
                            //console.log(navitem4);

                            //console.log(category)
                            Creative.findAll()
                              .then((creative) => {
                                Advisor.findAll()
                                  .then((advisor) => {
                                    CreativeTeam.findAll()
                                      .then((creativeteam) => {
                                        AdvisorTeam.findAll()
                                          .then((advisorteam) => {
                                            SubNavItem1_6.findAll()
                                              .then((subnavitem1_6) => {
                                                SubNavItem2_6.findAll()
                                                  .then((subnavitem2_6) => {
                                                    SubNavItem3_6.findAll()
                                                      .then((subnavitem3_6) => {
                                                        Question_Category.findAll(
                                                          {
                                                            include: [
                                                              {
                                                                model:
                                                                  QuestionAnswer,
                                                                required: true,
                                                              },
                                                            ],
                                                          }
                                                        )
                                                          .then((qcategory) => {
                                                            //console.log(JSON.stringify(qcategory, null, 2));
                                                            Solution_Category.findAll(
                                                              {
                                                                include: [
                                                                  {
                                                                    model:
                                                                      Solution_Details,
                                                                    required: true,
                                                                  },
                                                                ],
                                                              }
                                                            )
                                                              .then(
                                                                (s_details) => {
                                                                  //console.log(JSON.stringify(s_details, null, 2));
                                                                  Category.findAll(
                                                                    {
                                                                      include: [
                                                                        {
                                                                          model:
                                                                            Category_Details,
                                                                          required: true,
                                                                        },
                                                                      ],
                                                                    }
                                                                  ).then(
                                                                    (
                                                                      wcategory
                                                                    ) => {
                                                                      //console.log(JSON.stringify(wcategory, null, 2));
                                                                      res.render(
                                                                        "home/index",
                                                                        {
                                                                          layout:
                                                                            "page-layout",
                                                                          title,
                                                                          nitem,
                                                                          navitem1,
                                                                          navitem2,
                                                                          navitem3,
                                                                          navitem4,
                                                                          //category,
                                                                          creative,
                                                                          advisor,
                                                                          creativeteam,
                                                                          advisorteam,
                                                                          subnavitem1_6,
                                                                          subnavitem2_6,
                                                                          subnavitem3_6,

                                                                          qcategory,
                                                                          s_details,
                                                                          wcategory,
                                                                          email:
                                                                            req
                                                                              .session
                                                                              .email,
                                                                          name: req
                                                                            .session
                                                                            .name,
                                                                        }
                                                                      );
                                                                    }
                                                                  );
                                                                  //console.log(JSON.stringify(s_details, null, 2));
                                                                }
                                                              )
                                                              .catch((err) =>
                                                                console.log(err)
                                                              );
                                                          })
                                                          .catch((err) =>
                                                            console.log(err)
                                                          );
                                                      })
                                                      .catch((err) =>
                                                        console.log(err)
                                                      );
                                                  })
                                                  .catch((err) =>
                                                    console.log(err)
                                                  );
                                              })
                                              .catch((err) => console.log(err));
                                          })
                                          .catch((err) => console.log(err));
                                      })
                                      .catch((err) => console.log(err));
                                  })
                                  .catch((err) => console.log(err));
                              })
                              .catch((err) => console.log(err));
                          })

                          .catch((err) => console.log(err));
                      })

                      .catch((err) => console.log(err));
                  })

                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));

            //console.log(nitem);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
});

module.exports = router;
