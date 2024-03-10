#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["containerappsenvvariables.client/nuget.config", "containerappsenvvariables.client/"]
COPY ["ContainerAppsEnvVariables.Server/ContainerAppsEnvVariables.Server.csproj", "ContainerAppsEnvVariables.Server/"]
COPY ["containerappsenvvariables.client/containerappsenvvariables.client.esproj", "containerappsenvvariables.client/"]
RUN dotnet restore "./ContainerAppsEnvVariables.Server/./ContainerAppsEnvVariables.Server.csproj"
COPY . .
WORKDIR "/src/ContainerAppsEnvVariables.Server"
RUN dotnet build "./ContainerAppsEnvVariables.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ContainerAppsEnvVariables.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ContainerAppsEnvVariables.Server.dll"]