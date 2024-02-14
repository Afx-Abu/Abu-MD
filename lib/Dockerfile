FROM quay.io/afx-abu/abu-md
RUN git clone https://github.com/Afx-Abu/Abu-MD /root/Abu/
WORKDIR /root/Abu/
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
