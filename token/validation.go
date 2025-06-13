package token

import (
	"github.com/golang-jwt/jwt/v5"
	"github.com/pakkerman/logger"
)

func ValidateJWT(tokenString string, logger logger.Logger) (*jwt.Token, error) {
	jwtSecret := GetJWTSecret(logger)

	// Enure token's signing method is HMAC
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			logger.Error("Unexpected signing method", nil)
			return nil, jwt.ErrTokenSignatureInvalid
		}
		return []byte(jwtSecret), nil
	})
	if err != nil {
		logger.Error("Failed to validateJWT", err)
		return nil, err
	}

	if !token.Valid {
		logger.Error("Invalid JWT token", nil)
		return nil, jwt.ErrTokenInvalidId
	}

	return token, nil
}
