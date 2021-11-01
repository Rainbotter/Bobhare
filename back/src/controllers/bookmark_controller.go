package bookmark_controller

import (
	"fr/bobhare/src/models"
	"fr/bobhare/src/models/requests"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetBookmarks(c *gin.Context) {
	var bookmark models.Bookmark
	bookmark.Title = "test"
	c.JSON(http.StatusOK, bookmark)
}

func AddBookmarks(c *gin.Context) {
	var json requests.Input
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !json.Bidule || json.Truc != "123" {
		c.JSON(http.StatusUnauthorized, gin.H{"status": "unauthorized"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "you are logged in"})
}
