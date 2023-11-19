package main

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

type TextBox struct {
	Text           string `json:"text"`
	TextProperties `json:"text-properties"`
}
type TextProperties struct {
	FontSize             string `json:"font-size,omitempty"`
	FontColor            string `json:"font-color,omitempty"`
	FontFamily           string `json:"font-family,omitempty"`
	BoldItalicsUnderline int32  `json:"bold_italics_underline,omitempty"`
}
type Presentation struct {
	PresentationTitle  string `json:"presentation-title"`
	PresentationAuthor string `json:"presentation-author"`
	NoSlides           int32  `json:"no_slides"`
	Aspect             string `json:"aspect"`
}

type UserUid struct {
	Uid string
}

func main() {

	/*data := Presentation{
		PresentationTitle:  "Tytuł",
		PresentationAuthor: "Paryż",
		NoSlides:           2,
		Aspect:             "16x9",
	}
	enc := json.NewEncoder(os.Stdout)
	enc.Encode(data)*/
	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./backend/web/dist", true)))

	router.StaticFS("/resources", gin.Dir("resources", false))
	/*api := router.Group("/api/v1")
	{
		api.POST("/presentation-file", func(c *gin.Context) {
			//PresFile := c.Query("body")

			c.JSON(200, gin.H{
				"message": "ok",
			})
		})
		api.POST("/user", func(c *gin.Context) {
			var requestBody UserUid
			err := c.BindJSON(&requestBody)
			c.JSON(200, requestBody)
			if _, err = os.Stat("./resources/" + requestBody.Uid); os.IsNotExist(err) {
				err = os.Mkdir("./resources/"+requestBody.Uid, 0766)
			}
		})
		api.POST("/image", func(c *gin.Context) {

		})
	}*/
	//router.POST("/file", print2)
	router.Run(":3000")

}
