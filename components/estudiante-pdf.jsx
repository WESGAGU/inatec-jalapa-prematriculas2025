import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    marginLeft: 10,
  },
  documentoContainer: {
    width: "100%",
    height: 400,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  documentoImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    marginTop: 30,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 10,
    color: "black",
  },
  headerImage: {
    width: 115,
    height: 35,
    marginRight: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  line: {
    border: 1,
    position: "relative",
    left: 90,
    width: 350,
  },
  horizontal: {
    flexDirection: "row",
    marginTop: 3,
  },
  fontSize: {
    fontSize: 11,
    marginTop: 3,
    fontWeight: "extrabold",
    color:"#2a5d90"
  },
  datoPersonales: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

// Función para formatear la fecha corta
const formatShortDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Los meses en JavaScript son base 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Función para dividir nombres y apellidos
const splitNames = (fullName) => {
  const names = fullName.split(" ");
  return {
    primerNombre: names[0] || "",
    segundoNombre: names[1] || "",
  };
};

const splitLastNames = (fullLastName) => {
  const lastNames = fullLastName.split(" ");
  return {
    primerApellido: lastNames[0] || "",
    segundoApellido: lastNames[1] || "",
  };
};

const EstudiantePDF = ({ estudiante }) => {
  const { primerNombre, segundoNombre } = splitNames(estudiante.nombres);
  const { primerApellido, segundoApellido } = splitLastNames(
    estudiante.apellidos
  );

  return (
    <Document>
      {/* PRIMERA PÁGINA */}
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.headerContainer}>
          <Image src="/pueblo-presidente.png" style={styles.headerImage} />
          <Text style={{ fontWeight: "extrabold", color: "#2a5d90" }}>
            HOJA DE MATRÍCULA 2025
          </Text>
          <Image
            src="/logo2025.jpg"
            style={{ height: 50, width: 110, position: "relative", bottom: 5 }}
          />
        </View>

        {/* Centro y Fecha de Registro */}
        <View style={{ marginLeft: 5 }}>
          <View style={styles.datoPersonales}>
            {/* Columna Izquierda */}

            <View style={{ width: "50%" }}>
              <View style={styles.horizontal}>
                <Text style={styles.fontSize}>CENTRO:</Text>
                <Text
                  style={{
                    borderBottom: 1,
                    width: "100%",
                    marginLeft: 15,
                    fontSize: 10,
                  }}
                >
                  CENTRO TECNOLOGICO DE JALAPA
                </Text>
              </View>

              <View style={styles.horizontal}>
                <Text style={styles.fontSize}>FECHA:</Text>
                <Text
                  style={{
                    borderBottom: 1,
                    width: "40%",
                    marginLeft: 5,
                    fontSize: 12,
                  }}
                >
                  {formatShortDate(estudiante.fecha_registro)}
                </Text>
              </View>
            </View>

            {/* Columna Derecha */}
            <View style={{ marginLeft: 15, width: "55%" }}>
              <View>
              <Text style={styles.fontSize}>CORREO ELECTRONICO:</Text>
              </View>

              <View>
              <Text style={styles.fontSize}>CONTRASEÑA TEMPORAL:</Text>
              </View>

            </View>

          </View>
        </View>

        {/* Datos Personales */}
        <View>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 15,
              fontWeight: "bold",
              color:"#2a5d90"
            }}
          >
            I. DATOS PERSONALES
          </Text>
        </View>

        <View style={styles.datoPersonales}>
          {/* Columna Izquierda */}
          <View style={{ width: "50%" }}>
            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>NACIONALIDAD:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 30,
                  fontSize: 12,
                }}
              >
                Nicaragüense
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>FECHA DE NACIMIENTO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 70,
                  fontSize: 12,
                }}
              >
                {formatShortDate(estudiante.fecha_nacimiento)}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>PRIMER NOMBRE:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 40,
                  fontSize: 12,
                }}
              >
                {primerNombre}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>PRIMER APELLIDO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 45,
                  fontSize: 12,
                }}
              >
                {primerApellido}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>SEXO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 10,
                  fontSize: 12,
                }}
              >
                {estudiante.sexo}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>MUNICIPIO DE NACIMIENTO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 90,
                  fontSize: 12,
                }}
              >{estudiante.municipionacimiento}</Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>DEPART DOMICILIAR:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 50,
                  fontSize: 12,
                }}
              >
                {estudiante.departamento}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>COMUNIDAD DOMICILIAR:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: 140,
                  marginLeft: 10,
                  fontSize: 12,
                }}
              >
                {estudiante.comunidad}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>DIRECCIÓN DOMICILIAR:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: 140,
                  marginLeft: 8,
                  fontSize: 11,
                }}
              >
                {estudiante.direccion}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>EMAIL:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 10,
                  fontSize: 12,
                }}
              >
                {estudiante.email}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>NIVEL ACADEMICO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 45,
                  fontSize: 12,
                }}
              >
                {estudiante.nivel_academico}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>DISCAPACIDAD:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 25,
                  fontSize: 12,
                }}
              >
                {estudiante.discapacidad}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>MATRICULA:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 25,
                  fontSize: 12,
                }}
              >
                {estudiante.matricula}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>AÑO EGRESADO DE BACHILLERATO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 120,
                  fontSize: 12,
                }}
              >
                {estudiante.ano_egreso}
              </Text>
            </View>
          </View>

          {/* Columna Derecha */}
          <View style={{ marginLeft: 15, width: "55%" }}>
            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>CEDULA:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 15,
                  fontSize: 12,
                }}
              >
                {estudiante.cedula}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>CARNET:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 30,
                  fontSize: 12,
                }}
              >
                {estudiante.carnet}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>SEGUNDO NOMBRE:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 45,
                  fontSize: 12,
                }}
              >
                {segundoNombre}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>SEGUNDO APELLIDO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 50,
                  fontSize: 12,
                }}
              >
                {segundoApellido}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>ESTADO CIVIL:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 25,
                  fontSize: 12,
                }}
              >
                {estudiante.estadocivil}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>ETNIA:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 10,
                  fontSize: 12,
                }}
              >
                {estudiante.etnia}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>MUNICIPIO DOMICILIAR:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 60,
                  fontSize: 12,
                }}
              >
                {estudiante.municipio}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>N° PERSONAS EN EL HOGAR:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 90,
                  fontSize: 12,
                }}
              >
                {estudiante.personas_hogar}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>PROFESION:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 15,
                  fontSize: 12,
                }}
              >
                {estudiante.profesion}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>CELULAR:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 15,
                  fontSize: 12,
                }}
              >
                {estudiante.telefono}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>ÁREA:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 15,
                  fontSize: 12,
                }}
              >
                {estudiante.area}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>IDIOMA:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 15,
                  fontSize: 12,
                }}
              >
                {estudiante.idioma}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>TIPO DE SANGRE:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 30,
                  fontSize: 12,
                }}
              >
                {estudiante.tipo_sangre}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>AÑO DE SERVICIO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 30,
                  fontSize: 12,
                }}
              >
                {estudiante.ano_servicio}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>PROGRAMA DE EGRESO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 60,
                  fontSize: 12,
                }}
              >
                {estudiante.programa_egreso}
              </Text>
            </View>
          </View>
        </View>

        {/* Segunda Sección: Datos Laborales */}
        <View>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 15,
              fontWeight: "bold",
              color:"#2a5d90"
            }}
          >
            II. DATOS LABORALES DEL PROTAGONISTA
          </Text>
        </View>

        <View style={styles.datoPersonales}>
          {/* Columna Izquierda */}
          <View style={{ width: "50%" }}>
            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>EMPRESA:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 20,
                  fontSize: 12,
                }}
              >
                {estudiante.empresa}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>DEPARTAMENTO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 39,
                  fontSize: 12,
                }}
              >
                {estudiante.departamento_laboral}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>TELEFONO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 20,
                  fontSize: 12,
                }}
              >
                {estudiante.telefono_laboral}
              </Text>
            </View>
          </View>

          {/* Columna Derecha */}
          <View style={{ width: "55%", marginLeft: 15 }}>
            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>DIRECCION:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 23,
                  fontSize: 12,
                }}
              >
                {estudiante.direccion_laboral}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>MUNICIPIO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 25,
                  fontSize: 12,
                }}
              >
                {estudiante.municipio_laboral}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>CARGO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 15,
                  fontSize: 12,
                }}
              >
                {estudiante.cargo}
              </Text>
            </View>
          </View>
        </View>

        {/* Tercera Sección: En caso de emergencia */}
        <View>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 15,
              fontWeight: "extrabold",
              color:"#2a5d90"
            }}
          >
            III. EN CASO DE EMERGENCIA NOTIFICAR A
          </Text>
        </View>

        <View style={styles.datoPersonales}>
          {/* Columna Izquierda */}
          <View style={{ width: "50%" }}>
            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>NOMBRE:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 20,
                  fontSize: 12,
                }}
              >
                {estudiante.emergencia_nombres}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>DIRECCION:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 39,
                  fontSize: 12,
                }}
              ></Text>
            </View>
          </View>

          {/* Columna Derecha */}
          <View style={{ width: "55%", marginLeft: 15 }}>
            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>PARENTESCO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 35,
                  fontSize: 12,
                }}
              >
                {estudiante.emergencia_parentezco}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>TELEFONO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 25,
                  fontSize: 12,
                }}
              >
                {estudiante.emergencia_telefono}
              </Text>
            </View>
          </View>
        </View>

        {/* Cuarta Sección: Datos de Especialidad o Curso */}
        <View>
          <Text
            style={{
              textAlign: "center",
              borderColor: "#2a5d90",
              marginTop: 10,
              fontSize: 15,
              fontWeight: "extrabold",
              color:"#2a5d90"
            }}
          >
            IV. DATOS DE ESPECIALIDAD O CURSO
          </Text>
        </View>

        <View style={styles.datoPersonales}>
          {/* Columna Izquierda */}
          <View style={{ width: "50%" }}>
            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>DEPARTAMENTO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 30,
                  fontSize: 12,
                }}
              >
                {estudiante.departamento_curso}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>COMUNIDAD:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 39,
                  fontSize: 12,
                }}
              >
                {" "}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>DIRECCION DE LA ESCUELA:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 125,
                  fontSize: 12,
                }}
              ></Text>
            </View>

            <View
              style={{
                borderBottom: 1,
                marginTop: 16,
                marginBottom: 2,
                borderColor: "#2a5d90",
              }}
            ></View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>CURSO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 15,
                  fontSize: 12,
                }}
              >
                {estudiante.tecnico}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>GRUPO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 15,
                  fontSize: 12,
                }}
              ></Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>AÑO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 15,
                  fontSize: 12,
                }}
              >
                {" "}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>HORARIO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 20,
                  fontSize: 12,
                }}
              ></Text>
            </View>
          </View>

          {/* Columna Derecha */}
          <View style={{ width: "55%", marginLeft: 15 }}>
            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>MUNICIPIO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 30,
                  fontSize: 12,
                }}
              >
                {estudiante.municipio_curso}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>NOMBRE DE LA ESCUELA:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 80,
                  fontSize: 12,
                }}
              >
                {estudiante.nombre_escuela}
              </Text>
            </View>

            <View
              style={{
                borderBottom: 1,
                marginTop: 16,
                marginBottom: 2,
                borderColor: "#2a5d90",
              }}
            ></View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>ESTRATEGIA:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 30,
                  fontSize: 12,
                }}
              >
                {estudiante.estrategia}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>MODO DE FORMACION:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 70,
                  fontSize: 12,
                }}
              >
                {estudiante.modo_formacion}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>TURNO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 20,
                  fontSize: 12,
                }}
              >
                {estudiante.turno}
              </Text>
            </View>

            <View style={styles.horizontal}>
              <Text style={styles.fontSize}>FECHA DE INICIO:</Text>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "100%",
                  marginLeft: 50,
                  fontSize: 12,
                }}
              ></Text>
            </View>
          </View>
        </View>

        {/* Quinta Sección: Documentos Entregados */}
        <View>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 15,
              fontWeight: "extrabold",
              color:"#2a5d90"
            }}
          >
            V. DOCUMENTOS ENTREGADOS
          </Text>
        </View>

        <View style={styles.horizontal}>
          <Text style={styles.fontSize}>OBSERVACIONES:</Text>
          <Text
            style={{
              borderBottom: 1,
              borderColor: "#2a5d90",
              width: 350,
              marginLeft: 10,
              fontSize: 12,
            }}
          >
            {estudiante.observaciones}
          </Text>
        </View>

        {/* Firmas */}
        <View style={styles.datoPersonales}>
          {/* Columna Izquierda */}
          <View style={{ width: "50%", textAlign: "center" }}>
            <View>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "60%",
                  marginLeft: 60,
                  fontSize: 12,
                  marginTop: 25,
                }}
              ></Text>
              <Text
                style={{ fontSize: 12, marginTop: 2, borderColor: "#2a5d90" }}
              >
                FIRMA PROTAGONISTA
              </Text>
            </View>
          </View>

          {/* Columna Derecha */}
          <View style={{ width: "50%", marginLeft: 40, textAlign: "center" }}>
            <View>
              <Text
                style={{
                  borderBottom: 1,
                  borderColor: "#2a5d90",
                  width: "50%",
                  marginLeft: 65,
                  fontSize: 12,
                  marginTop: 25,
                }}
              ></Text>
              <Text
                style={{ fontSize: 12, marginTop: 2, borderColor: "#2a5d90" }}
              >
                FIRMA REGISTRO
              </Text>
            </View>
          </View>
        </View>
      </Page>

      {/* SEGUNDA PÁGINA: Imagen del Documento */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>DOCUMENTO DEL ESTUDIANTE</Text>
        </View>

        <View style={styles.documentoContainer}>
          <Image src={estudiante.documento} style={styles.documentoImage} />
        </View>
      </Page>

      {/* TERCERA PÁGINA: Imagen del Diploma o Notas */}
      <Page size="A4" style={styles.page}>
        <View style={styles.documentoContainer}>
          <Image src={estudiante.documento2} style={styles.documentoImage} />
        </View>
      </Page>
    </Document>
  );
};

export default EstudiantePDF;
