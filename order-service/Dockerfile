# ---- Build Stage ----
FROM azul/zulu-openjdk:17 AS build

WORKDIR /app

# Copy maven executable to the image
COPY mvnw .
COPY .mvn .mvn

# Copy the pom.xml file
COPY pom.xml .

# Build all dependencies for offline use
RUN ./mvnw dependency:go-offline -B

# Copy your other files
COPY . .

# Package the application
RUN ./mvnw package -DskipTests

# ---- Run Stage ----
FROM azul/zulu-openjdk-distroless:17

WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
