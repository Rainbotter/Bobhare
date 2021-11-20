package models

type Bookmark struct {
	Title string
	Links []Link
}

type Link struct {
	Url        string
	Text       string
	FaviconUrl string
}
