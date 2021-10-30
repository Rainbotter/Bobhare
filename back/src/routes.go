package main

import (
	"fr/bobhare/src/models/requests"
	"github.com/gin-gonic/gin"
	"net/http"
)

func setupRoutes(r *gin.Engine) {
	r.GET("/benchmark", func(c *gin.Context) {
		var json requests.Input
		if err := c.ShouldBindJSON(&json); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if json.Bidule != true || json.Truc != "123" {
			c.JSON(http.StatusUnauthorized, gin.H{"status": "unauthorized"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"status": "you are logged in"})
	})
}
