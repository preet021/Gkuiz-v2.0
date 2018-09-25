package main

import (
   "fmt"
   "github.com/gin-contrib/cors"
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB
var err error

type Person struct {
   ID uint `json:"id"`
   FullName string `json:"fullname"`
   Handle string `json:"handle"`
   Email string `json:"email"`
   Password string `json:"password"`
   City string `json:"city"`
   TotalScore int `json:totalscore`
   SportsScore int `json:sportsscore`
   MoviesScore int `json:moviesscore`
   LiteratureScore int `json:literaturescore`
   IsAdmin bool `json:"isadmin"`
}

type Question struct {
   ID uint `json:"id"`
   QueType string `json:"quetype"`
   Statement string `json:"statement"`
   Option1 string `json:"option1"`
   Option2 string `json:"option2"`
   Option3 string `json:"option3"`
   Option4 string `json:"option4"`
   Category string `json:"category"`
   QuizTitle string `json:"qtitle"`
   A1 bool `json:"a1"`
   A2 bool `json:"a2"`
   A3 bool `json:"a3"`
   A4 bool `json:"a4"`
}

type Attempted struct {
   ID uint `json:"id"`
   Handle string `json:"handle"`
   Category string `json:"category"`
   QuizTitle string `json:"qtitle"`
   Score int `json:"score"`
}

func main() {
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()
   db.AutoMigrate(&Person{})
   db.AutoMigrate(&Question{})
   db.AutoMigrate(&Attempted{})
   r := gin.Default()
   r.GET("/people/", GetPeople)
   r.GET("/questions/", GetQuestions)
   r.GET("/people/:handle", GetPerson)
   r.GET("/sort/:category", GetSorted)
   r.GET("/question/:id", GetQueById)
   r.GET("/questions/:category/:subcategory", GetQuestion)
   r.GET("/attempted/:handle/:category/:subcategory", GetAttempted)
   r.POST("/people", CreatePerson)
   r.POST("/question", CreateQuestion)
   r.POST("/attempted", MakeAttempted)
   r.PUT("/question/:id", UpdateQuestion)
   r.PUT("/people/:handle", UpdatePerson)
   r.PUT("/attempted/touch/:handle/:category/:subcategory", UpdateAttempted)
   r.DELETE("/people/:id", DeletePerson)
   r.DELETE("/question/:id", DeleteQuestion)
   r.DELETE("/deletequiz/:category/:title", DeleteQuiz)
   r.Use((cors.Default()))
   r.Run(":8080")
}

func UpdateQuestion (c *gin.Context) {
   id := c.Params.ByName("id")
   var que Question
   if err := db.Where("id = ?", id).First(&que).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&que)
   db.Save(&que)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, que)
}

func GetQueById (c *gin.Context) {
   var que Question
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).Find(&que).Error; err != nil {
      c.Header("access-control-allow-origin", "*")
      c.JSON(404, que)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      fmt.Println(que)
      c.JSON(200, que)
   }
}

func UpdateAttempted (c *gin.Context) {
   hndle := c.Params.ByName("handle")
   catg := c.Params.ByName("category")
   subcatg := c.Params.ByName("subcategory")
   var row Attempted
   if err := db.Where("handle = ? AND category = ? AND quiz_title = ?", hndle, catg, subcatg).First(&row).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&row)
   db.Save(&row)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, row)
}

func GetAttempted (c *gin.Context) {
   hndle := c.Params.ByName("handle")
   catg := c.Params.ByName("category")
   subcatg := c.Params.ByName("subcategory")
   if catg == "all" {
      var rows []Attempted
      if err := db.Where("handle = ?", hndle).Find(&rows).Error; err != nil {
         c.Header("access-control-allow-origin", "*")
         c.JSON(203, nil)
      } else {
         c.Header("access-control-allow-origin", "*")
         c.JSON(200, rows)
      }
   } else {
      var row Attempted
      if err := db.Where("handle = ? AND category = ? AND quiz_title = ?", hndle, catg, subcatg).First(&row).Error; err != nil {
         c.Header("access-control-allow-origin", "*")
         c.JSON(203, nil)
      } else {
         c.Header("access-control-allow-origin", "*")
         c.JSON(200, row)
      }
   }  
}

func MakeAttempted(c *gin.Context) {
   var row Attempted
   c.BindJSON(&row)
   db.Create(&row)
   c.Header("access-control-allow-origin", "*")
   fmt.Println(row)
   c.JSON(200, row)
}

func DeleteQuiz(c *gin.Context) {
   catg := c.Params.ByName("category")
   title := c.Params.ByName("title")
   var questions []Question
   d := db.Where("category = ? AND quiz_title = ?", catg, title).Delete(&questions)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, "deleted successfully")
}

func DeletePerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   d := db.Where("id = ?", id).Delete(&person)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func DeleteQuestion(c *gin.Context) {
   id := c.Params.ByName("id")
   var question Question
   d := db.Where("id = ?", id).Delete(&question)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdatePerson(c *gin.Context) {
   var person Person
   hndle := c.Params.ByName("handle")
   if err := db.Where("handle = ?", hndle).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&person)
   db.Save(&person)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, person)
}

func CreatePerson(c *gin.Context) {
   var person Person
   c.BindJSON(&person)
   db.Create(&person)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, person)
}

func CreateQuestion(c *gin.Context) {
   var question Question
   c.BindJSON(&question)
   db.Create(&question)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, question)
}

func GetPerson(c *gin.Context) {
   hndle := c.Params.ByName("handle")
   var person Person
   if err := db.Where("Handle = ?", hndle).First(&person).Error; err != nil {
      c.Header("access-control-allow-origin", "*")
      c.JSON(203, nil)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, person)
   }
}

func GetSorted(c *gin.Context) {
   var people []Person
   catg := c.Params.ByName("category")
   if catg == "All" {
      db.Order("total_score desc").Find(&people)
   } else if catg == "Sports" {
      db.Order("sports_score desc").Find(&people)
   } else if catg == "Movies" {
      db.Order("movies_score desc").Find(&people)
   } else if catg == "Literature" {
      db.Order("literature_score desc").Find(&people)
   }
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, people)
}

func GetPeople(c *gin.Context) {
   var people []Person
   if err := db.Find(&people).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, people)
   }
}

func GetQuestions(c *gin.Context) {
   var question []Question
   if err := db.Find(&question).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, question)
   }
}

func GetQuestion(c *gin.Context) {
   var questions []Question
   catg := c.Params.ByName("category")
   subcatg := c.Params.ByName("subcategory")
   if err := db.Where("category = ? AND quiz_title = ?", catg, subcatg).Find(&questions).Error; err != nil {
      c.Header("access-control-allow-origin", "*")
      c.JSON(203, nil)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, questions)
   }
}
