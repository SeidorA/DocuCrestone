FROM nginx:alpine
 
# Limpiar contenido default de Nginx
RUN rm -rf /usr/share/nginx/html/*
 
# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
 
# Copiar el build de Docusaurus
COPY build/ /usr/share/nginx/html
 
# Exponer puerto interno
EXPOSE 80
 
# Correr Nginx en modo foreground
CMD ["nginx", "-g", "daemon off;"]