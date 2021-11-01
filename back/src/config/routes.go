package config

import (
	bookmark_controller "fr/bobhare/src/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.GET("/bookmarks", bookmark_controller.GetBookmarks)
	r.POST("/bookmarks", bookmark_controller.AddBookmarks)
}
