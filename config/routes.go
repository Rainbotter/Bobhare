package config

import (
	"fr/bobhare/controllers"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	setupV1ApiRoutes(router)
	setupSPARoutes(router)
}

func setupV1ApiRoutes(router *gin.Engine) {
	grp := router.Group("/api/v1")
	{
		grp.GET("/bookmarks", controllers.GetBookmarks)
		grp.POST("/bookmarks", controllers.AddBookmarks)
	}
}

func setupSPARoutes(router *gin.Engine) {
	router.Use(static.Serve("/", static.LocalFile("./web/dist", true)))

	router.NoRoute(func(c *gin.Context) {
		c.File("./web/dist/index.html")
	})
}
