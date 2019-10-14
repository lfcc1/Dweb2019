<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    <xsl:output method= "xhtml" indent="yes" encoding="UTF-8"/>
    <xsl:template match="ARQELEM">
            <html>
                <head>
                    
                    <title>Arqueossitios</title>
                    <meta charset="UTF-8"></meta>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                    <style>
                        td {
                        padding-bottom: 10px;
                        padding-top: 10px;
                        }
                    </style>
                </head>
                <body>
                    <h3><center>ARQELEM</center></h3>
                    <hr/>
                    <table class="w3-table">
                       <xsl:apply-templates/>
                    </table>
                    <hr/>
                </body>
            </html>
        

        <hr/>
    </xsl:template>
    
    <xsl:template match="LIGA">
        <b><u><xsl:apply-templates/></u></b>
    </xsl:template>

    <xsl:template match="TIPO">
            <tr>
                <th>Tipo</th><td><xsl:value-of select="./@ASSUNTO"/></td>
            </tr>
            
    </xsl:template>
    <xsl:template match="IDENTI">
            <tr>
                <th>Identificação</th><td><xsl:value-of select="."/></td>
            </tr>
    </xsl:template>
    <xsl:template match="IMAGEM">
            <tr>
                <th>Imagem</th><td><xsl:value-of select="./@NOME"/></td>
            </tr>
            
    </xsl:template>
    <xsl:template match="DESCRI">
            <tr>
                <th>Descrição</th><td><xsl:apply-templates/> </td>
            </tr>
    </xsl:template>
    <xsl:template match="LUGAR">
            <tr>
                <th>Lugar</th><td><xsl:apply-templates/></td>
            </tr>
    </xsl:template>
    <xsl:template match="FREGUE">
            <tr>
                <th>Freguesia</th><td><xsl:apply-templates/></td>
            </tr>
    </xsl:template>
    <xsl:template match="CONCEL">
            <tr>
                <th>Concelho</th><td><xsl:value-of select="."/></td>
            </tr>
    </xsl:template>
    
    <xsl:template match="CODADM">
            <tr>
                <th>CODADM</th><td><xsl:value-of select="."/></td>
            </tr>
    </xsl:template>
    <xsl:template match="LATITU">
            <tr>
                <th>Latitude</th><td><xsl:value-of select="."/></td>
            </tr>
    </xsl:template>
    <xsl:template match="LONGIT">
            <tr>
                <th>Longitude</th><td><xsl:value-of select="."/></td>
            </tr>
    </xsl:template>
    
    <xsl:template match="ALTITU">
            <tr>
                <th>Altitude</th><td><xsl:value-of select="."/></td>
            </tr> 
    </xsl:template>
    
    <xsl:template match="ACESSO">
            <tr>
                <th>Acesso</th><td><xsl:apply-templates/></td>
            </tr>
    </xsl:template>
    
    <xsl:template match="QUADRO">
            <tr>
                <th>Quadro</th><td> <xsl:apply-templates/></td>
            </tr>
    </xsl:template>
    
    <xsl:template match="DESARQ">
            <tr>
                <th>DESARQ</th><td><xsl:apply-templates/></td>
            </tr>
    </xsl:template>
    <xsl:template match="INTERP">
            <tr>
                <th>INTERP</th><td><xsl:apply-templates/></td>
            </tr>
    </xsl:template>
    
    <xsl:template match="DEPOSI">
            <tr>
                <th>DEPOSI</th><td><xsl:value-of select="."/></td>
            </tr>
    </xsl:template>
    
    <xsl:template match="BIBLIO">
            <tr>
                <th>BIBLIO</th><td><xsl:apply-templates/></td>
            </tr>
    </xsl:template>
    
    <xsl:template match="AUTOR">
            <tr>
                <th>AUTOR</th><td><xsl:value-of select="."/></td>
            </tr>
    </xsl:template>
    
    <xsl:template match="DATA">
            <tr>
                <th>DATA</th><td><xsl:value-of select="."/></td>
            </tr>
    </xsl:template>
    
    <xsl:template match="CRONO">
            <tr>
                <th>CRONO</th><td><xsl:value-of select="."/></td>
            </tr>
    </xsl:template>
    
    <xsl:template match="TRAARQ">
            <tr>
                <th>TRAARQ</th><td><xsl:value-of select="."/></td>
            </tr>
    </xsl:template>
    <xsl:template match="INTERE">
            <tr>
                <th>INTERE</th><td><xsl:value-of select="."/></td>
            </tr>
    </xsl:template>
   
    
</xsl:stylesheet>