package main

import (
	"fr/bobhare/config"
	"github.com/gin-gonic/gin"
	"log"
)

func main() {
	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	config.SetupRoutes(router)

	log.Fatal(router.Run(":9000"))
}
