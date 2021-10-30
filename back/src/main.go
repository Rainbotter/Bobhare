package main

import (
	_ "fmt"
	"log"
	_ "log"
)

import "github.com/gin-gonic/gin"

func main() {
	r := gin.New()

	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	setupRoutes(r)

	// Listen and serve on 0.0.0.0:8080
	log.Fatal(r.Run(":8080"))
}
