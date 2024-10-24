const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = "supersecretkey";

const user = {
    id: "1",
    username: "admin",
    password: bcrypt.hashSync("password123", 8),
};

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username !== user.username) {
        return res.status(400).send("Usuário não encontrado");
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).send({ token });
});

app.get("/pages/admin", (req, res) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("Token não fornecido");
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send("Falha na autenticação do token");
        }

        res.status(200).send('Bem vindo ao painel de admin"');
    });
});

mongoose
    .connect("mongodb://localhost:27017/portifolio")
    .then(() => {
        console.log("Conectado ao MongoDB");
    })
    .catch((err) => {
        console.log("Erro ao Conectar ao MongoDB:", err);
    });

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
    details: String,
});
const Project = mongoose.model("Project", ProjectSchema);

const typeDefs = gql`
    type Project {
        id: ID!
        title: String!
        description: String!
        link: String!
        details: String!
    }

    type Query {
        projects: [Project]
        project(id: ID!): Project
    }

    type Mutation {
        addProject(title: String!, description: String!, link: String!, details: String!): Project
        updateProject(id: ID!, title: String!, description: String!, link: String!, details: String!): Project
        deleteProject(id: ID!): String
    }
`;
const resolvers = {
    Query: {
        projects: async () => await Project.find(),
        project: async (_, { id }) => await Project.findById(id),
    },
    Mutation: {
        addProject: async (_, { title, description, link, details }) => {
            const newProject = new Project({ title, description, link, details });
            await newProject.save();
            return newProject;
        },
        updateProject: async (_, {id, title, description, link, details}) => {
            const updatedProjeect = await Project.findByIdAndUpdate(
                id,
                {title, description, link, details},
                {new: true}
            )
        },
        deleteProject: async (_, { id }) => {
            await Project.findByIdAndDelete(id);
            return "Projeto deletado com sucesso";
        },
    },
};

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

startServer();
