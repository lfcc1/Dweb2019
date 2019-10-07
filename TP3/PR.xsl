<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    <xsl:output method= "xhtml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <title><xsl:value-of select="pr/metadata/title"/></title>
                <meta http-equiv="Content-Language content=pt"/>
                <meta http-equiv='Content-Type content="text/html; charset=iso-8859-1"'/>
                <meta content="MSHTML 6.00.2800.1170" name="GENERATOR"/>
                <meta content="FrontPage.Editor.Document name=ProgId"/>
            </head>
            <body>
                
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    
    <xsl:template match="pr">
    <xsl:apply-templates select="metadata"/>
    <xsl:apply-templates select="workteam"/> 
    <xsl:apply-templates select="abstract"/> 
    <xsl:apply-templates select="deliverables"/> 
    </xsl:template>
    <xsl:template match="metadata">
        <h1  width="100%" ><center><xsl:value-of select="title"/></center> </h1>
        <hr/>
        
        <table width="100%" border="0">
            <tbody>
                <tr>
                    <td width="50%"><b>KEY NAME:</b> <font color="#000080"><xsl:value-of select="keyname"/></font></td>
                    <td width="50%"><b>BEGIN DATE:</b> <font color="#000080"><xsl:value-of select="bdate"/></font></td></tr>
                <tr>
                    <td width="50%"><b>TITLE:</b> <xsl:value-of select="title"/></td>
                    <td width="50%"><b>END DATE:</b> <font color="#000080"> <xsl:value-of select="edate"/></font></td></tr>
                <tr>
                    <xsl:choose>
                        <xsl:when test="/subtitle">
                        <td width="50%"><b>SUBTITLE:</b> <xsl:value-of select="subtitle"/></td>
                        </xsl:when>
                    </xsl:choose>
                    
                    <td width="50%"><b>SUPERVISOR:</b> <font color="#000080">
                        <a href="{supervisor/@homepage}" target="_blank"><xsl:value-of select="supervisor"/></a></font></td></tr></tbody></table>
        <hr/>
        <hr/>
        
    </xsl:template>
    
    <xsl:template match="workteam">
        
        <H3>WorkTeam:</H3>
        <ul>
        <xsl:apply-templates select="worker"/>
        </ul>
        <hr/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="worker">
            <li>
                <a href="{git}" target="_blank"> <xsl:value-of select="identifier"/> - <xsl:value-of select="name"/></a> - <a href="mailto:{email}"> <xsl:value-of select="email"/></a>
            </li>
    </xsl:template>
    <xsl:template match="abstract">
        <H3>Abstract:</H3>
        <xsl:apply-templates select="p"/>
        <hr/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="p">
        <p><xsl:apply-templates/></p>
    </xsl:template>
    
    <xsl:template match="i">
        <i><xsl:apply-templates/></i>
    </xsl:template>
    
    <xsl:template match="u">
        <u><xsl:apply-templates/></u>
    </xsl:template>
    
    <xsl:template match="b">
        <b><xsl:apply-templates/></b>
    </xsl:template>
    
    <xsl:template match="xref">
        <a href="{@url}" target="_blank"> <xsl:apply-templates/></a>
    </xsl:template>
    <xsl:template match="deliverables">
        <H3>Deliverables:</H3>
        <ul>
        <xsl:apply-templates select="deliverable"/>
        </ul>
        <hr/>
        <xsl:value-of  select="current-date()"/>
    </xsl:template>
    
    <xsl:template match="deliverable">
        <li>
            <a href="{@path}" target="_blank"> <xsl:apply-templates/></a>
        </li>

    </xsl:template>
    
    
</xsl:stylesheet>