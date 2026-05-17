Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $root "public\brand"
New-Item -ItemType Directory -Path $outDir -Force | Out-Null

function New-ArgbBitmap {
  param(
    [Parameter(Mandatory = $true)][int]$Width,
    [Parameter(Mandatory = $true)][int]$Height
  )

  return New-Object System.Drawing.Bitmap(
    $Width,
    $Height,
    [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
  )
}

function Get-FontName {
  param(
    [string[]]$Candidates
  )

  $installed = [System.Drawing.FontFamily]::Families | ForEach-Object { $_.Name }
  foreach ($candidate in $Candidates) {
    if ($installed -contains $candidate) {
      return $candidate
    }
  }
  return "Segoe UI"
}

function Draw-GlowCircle {
  param(
    [Parameter(Mandatory = $true)]$Graphics,
    [Parameter(Mandatory = $true)][float]$CenterX,
    [Parameter(Mandatory = $true)][float]$CenterY,
    [Parameter(Mandatory = $true)][float]$Radius,
    [Parameter(Mandatory = $true)][System.Drawing.Color]$Color
  )

  for ($i = $Radius; $i -ge 40; $i -= 14) {
    $ratio = $i / $Radius
    $alpha = [int](130 * [Math]::Pow($ratio, 1.85))
    if ($alpha -lt 1) { continue }

    $pen = New-Object System.Drawing.Pen(
      [System.Drawing.Color]::FromArgb($alpha, $Color.R, $Color.G, $Color.B),
      2.5
    )
    $Graphics.DrawEllipse($pen, $CenterX - $i, $CenterY - $i, $i * 2, $i * 2)
    $pen.Dispose()
  }
}

function Draw-TextWithGlow {
  param(
    [Parameter(Mandatory = $true)]$Graphics,
    [Parameter(Mandatory = $true)][string]$Text,
    [Parameter(Mandatory = $true)][string]$FontName,
    [Parameter(Mandatory = $true)][float]$FontSize,
    [Parameter(Mandatory = $true)][float]$X,
    [Parameter(Mandatory = $true)][float]$Y
  )

  $fontFamily = New-Object System.Drawing.FontFamily($FontName)
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddString(
    $Text,
    $fontFamily,
    [int][System.Drawing.FontStyle]::Bold,
    $FontSize,
    (New-Object System.Drawing.PointF($X, $Y)),
    [System.Drawing.StringFormat]::GenericDefault
  )

  foreach ($stroke in @(26, 16, 8)) {
    $alpha = switch ($stroke) {
      26 { 40 }
      16 { 74 }
      Default { 110 }
    }
    $glowPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb($alpha, 70, 206, 255), $stroke)
    $glowPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $Graphics.DrawPath($glowPen, $path)
    $glowPen.Dispose()
  }

  $bounds = $path.GetBounds()
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.PointF($bounds.Left, $bounds.Top)),
    (New-Object System.Drawing.PointF($bounds.Right, $bounds.Bottom)),
    [System.Drawing.Color]::FromArgb(255, 230, 248, 255),
    [System.Drawing.Color]::FromArgb(255, 110, 220, 255)
  )
  $Graphics.FillPath($brush, $path)

  $outlinePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(190, 220, 245, 255), 1.4)
  $outlinePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $Graphics.DrawPath($outlinePen, $path)

  $outlinePen.Dispose()
  $brush.Dispose()
  $path.Dispose()
  $fontFamily.Dispose()
}

function Draw-NeonString {
  param(
    [Parameter(Mandatory = $true)]$Graphics,
    [Parameter(Mandatory = $true)][string]$Text,
    [Parameter(Mandatory = $true)][string]$FontName,
    [Parameter(Mandatory = $true)][float]$FontSize,
    [Parameter(Mandatory = $true)][float]$X,
    [Parameter(Mandatory = $true)][float]$Y
  )

  $font = New-Object System.Drawing.Font($FontName, $FontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)

  foreach ($ring in @(12, 8, 5)) {
    $alpha = switch ($ring) {
      12 { 28 }
      8 { 48 }
      Default { 72 }
    }
    for ($a = 0; $a -lt 360; $a += 18) {
      $rad = [Math]::PI * $a / 180.0
      $dx = [Math]::Cos($rad) * $ring
      $dy = [Math]::Sin($rad) * $ring
      $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($alpha, 73, 210, 255))
      $Graphics.DrawString($Text, $font, $brush, $X + $dx, $Y + $dy)
      $brush.Dispose()
    }
  }

  $mainBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 208, 238, 255))
  $Graphics.DrawString($Text, $font, $mainBrush, $X, $Y)
  $mainBrush.Dispose()
  $font.Dispose()
}

function Save-Png {
  param(
    [Parameter(Mandatory = $true)][System.Drawing.Bitmap]$Bitmap,
    [Parameter(Mandatory = $true)][string]$Path
  )

  $Bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
}

# Deterministic random primitives for consistent style
Get-Random -SetSeed 26062026 | Out-Null

$fontMain = Get-FontName -Candidates @("Bahnschrift", "Segoe UI", "Arial")
$fontSub = Get-FontName -Candidates @("Segoe UI", "Arial")

# ============================================================
# 1) Hero banner (transparent)
# ============================================================
$banner = New-ArgbBitmap -Width 2400 -Height 760
$g = [System.Drawing.Graphics]::FromImage($banner)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.Color]::Transparent)

# Neon rings
Draw-GlowCircle -Graphics $g -CenterX 320 -CenterY 390 -Radius 260 -Color ([System.Drawing.Color]::FromArgb(0, 216, 255))
Draw-GlowCircle -Graphics $g -CenterX 2090 -CenterY 370 -Radius 300 -Color ([System.Drawing.Color]::FromArgb(88, 107, 255))

# Circuit arcs and trails
for ($i = 0; $i -lt 18; $i++) {
  $x = Get-Random -Minimum 130 -Maximum 2280
  $y = Get-Random -Minimum 40 -Maximum 680
  $w = Get-Random -Minimum 120 -Maximum 420
  $h = Get-Random -Minimum 70 -Maximum 290
  $start = Get-Random -Minimum 0 -Maximum 360
  $sweep = Get-Random -Minimum 70 -Maximum 240

  $isBlue = (Get-Random -Minimum 0 -Maximum 2) -eq 0
  $color = if ($isBlue) {
    [System.Drawing.Color]::FromArgb(95, 88, 165, 255)
  } else {
    [System.Drawing.Color]::FromArgb(95, 0, 228, 255)
  }

  $pen = New-Object System.Drawing.Pen($color, (Get-Random -Minimum 1 -Maximum 4))
  $pen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
  $g.DrawArc($pen, $x, $y, $w, $h, $start, $sweep)
  $pen.Dispose()
}

for ($i = 0; $i -lt 36; $i++) {
  $cx = Get-Random -Minimum 100 -Maximum 2320
  $cy = Get-Random -Minimum 80 -Maximum 690
  $r = Get-Random -Minimum 2 -Maximum 8
  $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(155, 160, 238, 255))
  $g.FillEllipse($brush, $cx, $cy, $r, $r)
  $brush.Dispose()
}

Draw-NeonString -Graphics $g -Text "FISHA Innovation Hub" -FontName $fontMain -FontSize 138 -X 360 -Y 248

$subFont = New-Object System.Drawing.Font($fontSub, 40, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(215, 200, 238, 255))
$g.DrawString("Digital Innovation Showcase", $subFont, $subBrush, 380, 430)

# Accent line under subtitle
$linePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 95, 200, 255), 4)
$g.DrawLine($linePen, 378, 484, 1234, 484)
$linePen.Dispose()

$subBrush.Dispose()
$subFont.Dispose()
$g.Dispose()

$bannerPath = Join-Path $outDir "brand-banner-v2.png"
Save-Png -Bitmap $banner -Path $bannerPath
$banner.Dispose()

# ============================================================
# 2) Square brand icon (transparent)
# ============================================================
$iconSize = 1024
$icon = New-ArgbBitmap -Width $iconSize -Height $iconSize
$gi = [System.Drawing.Graphics]::FromImage($icon)
$gi.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gi.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gi.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gi.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$gi.Clear([System.Drawing.Color]::Transparent)

# Main rounded plate
$plateRect = New-Object System.Drawing.RectangleF(92, 92, 840, 840)
$platePath = New-Object System.Drawing.Drawing2D.GraphicsPath
$r = 190.0
$platePath.AddArc($plateRect.X, $plateRect.Y, $r, $r, 180, 90)
$platePath.AddArc($plateRect.Right - $r, $plateRect.Y, $r, $r, 270, 90)
$platePath.AddArc($plateRect.Right - $r, $plateRect.Bottom - $r, $r, $r, 0, 90)
$platePath.AddArc($plateRect.X, $plateRect.Bottom - $r, $r, $r, 90, 90)
$platePath.CloseFigure()

$plateBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.PointF(90, 90)),
  (New-Object System.Drawing.PointF(930, 930)),
  [System.Drawing.Color]::FromArgb(240, 23, 40, 88),
  [System.Drawing.Color]::FromArgb(240, 42, 100, 180)
)
$gi.FillPath($plateBrush, $platePath)

# Outer glow
for ($s = 36; $s -ge 8; $s -= 7) {
  $alpha = [int](95 * ($s / 36.0))
  $glowPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb($alpha, 88, 182, 255), $s)
  $glowPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $gi.DrawPath($glowPen, $platePath)
  $glowPen.Dispose()
}

# Grid lines
for ($x = 170; $x -le 850; $x += 95) {
  $p = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(55, 155, 230, 255), 2)
  $gi.DrawLine($p, $x, 160, $x, 860)
  $p.Dispose()
}
for ($y = 170; $y -le 850; $y += 95) {
  $p = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(45, 132, 210, 255), 2)
  $gi.DrawLine($p, 160, $y, 860, $y)
  $p.Dispose()
}

# "F" monogram + highlight
$ff = New-Object System.Drawing.FontFamily($fontMain)
$fPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$fPath.AddString(
  "F",
  $ff,
  [int][System.Drawing.FontStyle]::Bold,
  470,
  (New-Object System.Drawing.PointF(300, 205)),
  [System.Drawing.StringFormat]::GenericDefault
)

foreach ($stroke in @(24, 14, 8)) {
  $alpha = switch ($stroke) {
    24 { 60 }
    14 { 100 }
    Default { 135 }
  }
  $sp = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb($alpha, 72, 216, 255), $stroke)
  $sp.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $gi.DrawPath($sp, $fPath)
  $sp.Dispose()
}

$fBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.PointF(300, 210)),
  (New-Object System.Drawing.PointF(720, 770)),
  [System.Drawing.Color]::FromArgb(255, 240, 252, 255),
  [System.Drawing.Color]::FromArgb(255, 137, 225, 255)
)
$gi.FillPath($fBrush, $fPath)

$fOutline = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(210, 230, 250, 255), 2)
$gi.DrawPath($fOutline, $fPath)

$fOutline.Dispose()
$fBrush.Dispose()
$fPath.Dispose()
$ff.Dispose()
$plateBrush.Dispose()
$platePath.Dispose()
$gi.Dispose()

$iconPath = Join-Path $outDir "brand-icon-square-v2.png"
Save-Png -Bitmap $icon -Path $iconPath

# ============================================================
# 3) Derived app/favicons
# ============================================================
function Save-ResizedIcon {
  param(
    [Parameter(Mandatory = $true)][System.Drawing.Bitmap]$Source,
    [Parameter(Mandatory = $true)][int]$Size,
    [Parameter(Mandatory = $true)][string]$FileName
  )

  $bmp = New-ArgbBitmap -Width $Size -Height $Size
  $g2 = [System.Drawing.Graphics]::FromImage($bmp)
  $g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g2.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g2.Clear([System.Drawing.Color]::Transparent)
  $g2.DrawImage($Source, 0, 0, $Size, $Size)
  $g2.Dispose()
  Save-Png -Bitmap $bmp -Path (Join-Path $outDir $FileName)
  $bmp.Dispose()
}

Save-ResizedIcon -Source $icon -Size 16  -FileName "favicon-16x16-v2.png"
Save-ResizedIcon -Source $icon -Size 32  -FileName "favicon-32x32-v2.png"
Save-ResizedIcon -Source $icon -Size 180 -FileName "apple-touch-icon-v2.png"
Save-ResizedIcon -Source $icon -Size 192 -FileName "android-chrome-192x192-v2.png"
Save-ResizedIcon -Source $icon -Size 512 -FileName "android-chrome-512x512-v2.png"

$icon.Dispose()

Write-Host "Brand assets generated in: $outDir"
