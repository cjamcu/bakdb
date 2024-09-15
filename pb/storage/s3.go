package storage

import (
	"context"
	"fmt"
	"io"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type CloudStorage struct {
	client     *s3.Client
	bucket     string
	pathPrefix string
}

func NewS3Storage(storageConfig StorageConfig) (*CloudStorage, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(storageConfig.Key, storageConfig.Secret, "")),
		config.WithRegion(storageConfig.Region),
	)
	if err != nil {
		return nil, fmt.Errorf("error loading S3 config: %v", err)
	}

	client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		if storageConfig.Endpoint != "" {
			o.BaseEndpoint = aws.String(storageConfig.Endpoint)
		}
	})

	return &CloudStorage{
		client:     client,
		bucket:     storageConfig.Bucket,
		pathPrefix: storageConfig.Path,
	}, nil
}
func (cs *CloudStorage) Upload(filename string, data io.Reader) error {

	key := cs.pathPrefix + "/" + filename
	_, err := cs.client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(cs.bucket),
		Key:    aws.String(key),
		Body:   data,
	})
	if err != nil {
		return fmt.Errorf("error uploading file %s: %v", filename, err)
	}
	return nil
}

func (cs *CloudStorage) Download(filename string) (io.ReadCloser, error) {
	key := cs.pathPrefix + "/" + filename
	result, err := cs.client.GetObject(context.TODO(), &s3.GetObjectInput{
		Bucket: aws.String(cs.bucket),
		Key:    aws.String(key),
	})
	if err != nil {
		return nil, fmt.Errorf("error downloading file %s: %v", filename, err)
	}
	return result.Body, nil
}

func (cs *CloudStorage) Delete(filename string) error {
	key := cs.pathPrefix + "/" + filename
	_, err := cs.client.DeleteObject(context.TODO(), &s3.DeleteObjectInput{
		Bucket: aws.String(cs.bucket),
		Key:    aws.String(key),
	})
	if err != nil {
		return fmt.Errorf("error deleting file %s: %v", filename, err)
	}
	return nil
}

func (cs *CloudStorage) ValidateConnection(config StorageConfig) error {
	_, err := cs.client.ListBuckets(context.TODO(), &s3.ListBucketsInput{})
	if err != nil {
		return fmt.Errorf("error validating S3 connection: %v", err)
	}
	return nil
}
