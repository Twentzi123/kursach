<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <div class="div_for_text">
      <div class="text_1">
        <h2>Расписание занятий</h2>
      </div>
      <p class="p1">
        <xsl:value-of select="schedule/introduction"/>
      </p>
      
      <xsl:for-each select="schedule/class">
        <p class="p1">
          <xsl:value-of select="name"/>: 
          <xsl:value-of select="days"/> – 
          <xsl:value-of select="times"/>
          <xsl:if test="note">
            <xsl:text> </xsl:text><xsl:value-of select="note"/>
          </xsl:if>
        </p>
      </xsl:for-each>
      
      <p class="p1">
        <xsl:value-of select="schedule/weekend/description"/>
        <xsl:text> </xsl:text>
        <xsl:value-of select="schedule/weekend/day"/> – 
        <xsl:for-each select="schedule/weekend/activities/activity">
          <xsl:value-of select="@time"/>
          <xsl:text> </xsl:text>
          <xsl:value-of select="."/>
          <xsl:if test="position() != last()">, </xsl:if>
        </xsl:for-each>
      </p>
    </div>
  </xsl:template>
</xsl:stylesheet>