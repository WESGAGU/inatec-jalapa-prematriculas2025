import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

// Estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerImage: {
    width: 130,
    height: 30,
  },
  horizontal: {
    flexDirection: "row",
    marginTop: 3,
  },
  fontSize: {
    fontSize: 10, // Tamaño de fuente reducido
    marginTop: 3,
  },
  datoPersonales: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  borderBottom: {
    borderBottom: 1,
    fontSize: 10, // Tamaño de fuente reducido
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
  },
});

// Función para formatear la fecha
const formatShortDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const EstudiantePDF = ({ estudiante }) => (
  <Document>
    {/* Primera página */}
    <Page size="A4" style={styles.page}>
      {/* Encabezado */}
      <View style={styles.headerContainer}>
        <Image src="/pueblo-presidente.png" style={styles.headerImage} />
        <Text>HOJA DE MATRÍCULA</Text>
        <Image src="/victorias-logo.png" style={styles.headerImage} />
      </View>

      {/* Datos del centro y fecha */}
      <View>
        <View style={styles.horizontal}>
          <Text style={styles.fontSize}>CENTRO:</Text>
          <Text style={[styles.borderBottom, { width: 350, marginLeft: 5 }]}>
            Tecnológico de Jalapa
          </Text>
        </View>
        <View style={styles.horizontal}>
          <Text style={styles.fontSize}>FECHA:</Text>
          <Text style={[styles.borderBottom, { width: 200, marginLeft: 15 }]}>
            {formatShortDate(estudiante.fecha_registro)}
          </Text>
        </View>
      </View>

      {/* Datos personales */}
      <Text style={styles.sectionTitle}>DATOS PERSONALES</Text>
      <View style={styles.datoPersonales}>
        {/* Columna izquierda */}
        <View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>NACIONALIDAD:</Text>
            <Text style={[styles.borderBottom, { width: 180, marginLeft: 10 }]}>
              Nicaragüense
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>FECHA DE NACIMIENTO:</Text>
            <Text style={[styles.borderBottom, { width: 127, marginLeft: 10 }]}>
              {formatShortDate(estudiante.fecha_nacimiento)}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>NOMBRES:</Text>
            <Text style={[styles.borderBottom, { width: 211, marginLeft: 10 }]}>
              {estudiante.nombres}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>SEXO:</Text>
            <Text style={[styles.borderBottom, { width: 240, marginLeft: 10 }]}>
              {estudiante.sexo}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>MUNICIPIO DE NACIMIENTO:</Text>
            <Text style={[styles.borderBottom, { width: 100, marginLeft: 10 }]}>
              {estudiante.municipio}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>DEPART DOMICILIAR:</Text>
            <Text style={[styles.borderBottom, { width: 150, marginLeft: 10 }]}>
              {estudiante.departamento}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>COMUNIDAD DOMICILIAR:</Text>
            <Text style={[styles.borderBottom, { width: 140, marginLeft: 15 }]}>
              {estudiante.comunidad}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>DIRECCIÓN DOMICILIAR:</Text>
            <Text style={[styles.borderBottom, { width: 140, marginLeft: 10 }]}>
              {estudiante.direccion}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>NIVEL ACADEMICO:</Text>
            <Text style={[styles.borderBottom, { width: 160, marginLeft: 10 }]}>
              {estudiante.nivel_academico}
            </Text>
          </View>
        </View>

        {/* Columna derecha */}
        <View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>IDENTIFICACIÓN:</Text>
            <Text style={[styles.borderBottom, { width: 150, marginLeft: 10 }]}>
              {/* Valor vacío */}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>CARNET:</Text>
            <Text style={[styles.borderBottom, { width: 200, marginLeft: 10 }]}>
              {/* Valor vacío */}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>APELLIDOS:</Text>
            <Text style={[styles.borderBottom, { width: 180, marginLeft: 10 }]}>
              {estudiante.apellidos}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>ESTADO CIVIL:</Text>
            <Text style={[styles.borderBottom, { width: 166, marginLeft: 10 }]}>
              Solter@
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>ETNIA:</Text>
            <Text style={[styles.borderBottom, { width: 215, marginLeft: 10 }]}>
              {/* Valor vacío */}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>MUNICIPIO DOMICILIAR:</Text>
            <Text style={[styles.borderBottom, { width: 105, marginLeft: 10 }]}>
              {estudiante.municipio}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>N° PERSONAS EN EL HOGAR:</Text>
            <Text style={[styles.borderBottom, { width: 72, marginLeft: 10 }]}>
              {estudiante.personas_hogar}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>CELULAR:</Text>
            <Text style={[styles.borderBottom, { width: 190, marginLeft: 15 }]}>
              {estudiante.telefono}
            </Text>
          </View>
        </View>
      </View>

      {/* Datos laborales */}
      <Text style={styles.sectionTitle}>II. DATOS LABORALES DEL PROTAGONISTA</Text>
      <View style={styles.datoPersonales}>
        {/* Columna izquierda */}
        <View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>EMPRESA:</Text>
            <Text style={[styles.borderBottom, { width: 180, marginLeft: 10 }]}>
              {/* Valor vacío */}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>DEPARTAMENTO:</Text>
            <Text style={[styles.borderBottom, { width: 150, marginLeft: 10 }]}>
              {/* Valor vacío */}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>TELEFONO:</Text>
            <Text style={[styles.borderBottom, { width: 180, marginLeft: 10 }]}>
              {/* Valor vacío */}
            </Text>
          </View>
        </View>

        {/* Columna derecha */}
        <View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>DIRECCION:</Text>
            <Text style={[styles.borderBottom, { width: 150, marginLeft: 10 }]}>
              {/* Valor vacío */}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>MUNICIPIO:</Text>
            <Text style={[styles.borderBottom, { width: 150, marginLeft: 10 }]}>
              {/* Valor vacío */}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>CARGO:</Text>
            <Text style={[styles.borderBottom, { width: 150, marginLeft: 10 }]}>
              {/* Valor vacío */}
            </Text>
          </View>
        </View>
      </View>

      {/* En caso de emergencia */}
      <Text style={styles.sectionTitle}>III. EN CASO DE EMERGENCIA NOTIFICAR A</Text>
      <View style={styles.datoPersonales}>
        {/* Columna izquierda */}
        <View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>NOMBRE:</Text>
            <Text style={[styles.borderBottom, { width: 180, marginLeft: 10 }]}>
              {estudiante.emergencia_nombres}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>DIRECCION:</Text>
            <Text style={[styles.borderBottom, { width: 150, marginLeft: 10 }]}>
              {/* Valor vacío */}
            </Text>
          </View>
        </View>

        {/* Columna derecha */}
        <View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>PARENTESCO:</Text>
            <Text style={[styles.borderBottom, { width: 150, marginLeft: 10 }]}>
              {estudiante.emergencia_parentezco}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>TELEFONO:</Text>
            <Text style={[styles.borderBottom, { width: 150, marginLeft: 10 }]}>
              {estudiante.emergencia_telefono}
            </Text>
          </View>
        </View>
      </View>

      {/* Datos de especialidad o curso */}
      <Text style={styles.sectionTitle}>IV. DATOS DE ESPECIALIDAD O CURSO</Text>
      <View style={styles.datoPersonales}>
        {/* Columna izquierda */}
        <View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>CURSO:</Text>
            <Text style={[styles.borderBottom, { width: 180, marginLeft: 10 }]}>
              {estudiante.tecnico}
            </Text>
          </View>
        </View>

        {/* Columna derecha */}
        <View>
          <View style={styles.horizontal}>
            <Text style={styles.fontSize}>ESTRATEGIA:</Text>
            <Text style={[styles.borderBottom, { width: 150, marginLeft: 10 }]}>
              {/* Valor vacío */}
            </Text>
          </View>
        </View>
      </View>

      {/* Documentos entregados */}
      <Text style={styles.sectionTitle}>V. DOCUMENTOS ENTREGADOS</Text>
      <View style={styles.horizontal}>
        <Text style={styles.fontSize}>OBSERVACIONES:</Text>
        <Text style={[styles.borderBottom, { width: 350, marginLeft: 10 }]}>
          {/* Valor vacío */}
        </Text>
      </View>

      {/* Firmas */}
      <View style={styles.datoPersonales}>
        <View>
          <Text style={[styles.borderBottom, { width: 150, marginLeft: 60, marginTop: 25 }]} />
          <Text style={{ fontSize: 10, marginTop: 2 }}>FIRMA PROTAGONISTA</Text>
        </View>
        <View>
          <Text style={[styles.borderBottom, { width: 150, marginLeft: 65, marginTop: 25 }]} />
          <Text style={{ fontSize: 10, marginTop: 2 }}>FIRMA REGISTRO</Text>
        </View>
      </View>
    </Page>

    {/* Segunda página (imagen del documento) */}
    <Page size="A4" style={styles.page}>
      <View style={styles.documentoContainer}>
        <Image src={estudiante.documento} style={styles.documentoImage} />
      </View>
    </Page>
  </Document>
);

export default EstudiantePDF;