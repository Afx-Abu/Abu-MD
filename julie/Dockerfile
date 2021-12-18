FROM fusuf/whatsasena:latest

RUN git clone https://github.com/Aj-fx/Kaztroserv2 /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Asia/Kolkata
RUN npm install supervisor -g
RUN yarn install --no-audit
RUN git clone https://github.com/Amal-ser/html

CMD ["node", "bot.js"]
