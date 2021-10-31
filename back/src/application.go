package bobhare

import (
	"fr/bobhare/src/config"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Run() {
	r := gin.New()
	r.Use(cors.Default())
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	config.SetupRoutes(r)

	log.Fatal(r.Run(":9000"))
}
