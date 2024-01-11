package httpx

import (
	"io"
	"net/http"

	"github.com/samber/lo"
)

func MustGetBody(url string) string {
	resp := lo.Must(http.Get(url))
	defer resp.Body.Close()

	isValidStatus := resp.StatusCode >= 200 && resp.StatusCode < 400
	lo.Must0(isValidStatus, "invalid status code: %d while fetching content", resp.StatusCode)

	raw := lo.Must(io.ReadAll(resp.Body))
	return string(raw)
}
