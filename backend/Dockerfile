# Backend Dockerfile
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy the current directory contents into the container
COPY . .

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Set environment variables (use defaults if not set)
ENV ELASTICSEARCH_HOST=localhost
ENV ELASTICSEARCH_PORT=9200
ENV EMPLOYEE_DATA_FILE=./data/Employee\ Sample\ Data\ 1.csv

# Expose port 5000 for Flask
EXPOSE 5000

# Run the Flask app
CMD ["flask", "run", "--host=0.0.0.0"]
