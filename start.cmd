cd ./service
start pnpm serve > service.log &
echo "Start service complete!"


cd ..
echo "" > front.log
start pnpm dev > front.log &
echo "Start front complete!"
